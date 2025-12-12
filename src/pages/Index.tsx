import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

interface Content {
  id: string;
  title: string;
  year: string;
  genre: string;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  reviews: Review[];
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [profileAvatar, setProfileAvatar] = useState('');
  const [profileBanner, setProfileBanner] = useState('https://cdn.poehali.dev/projects/59f3fdc1-7a70-47a9-bcfe-9f9c881e11b4/files/f03f9437-1336-49f1-be37-844de656b3b6.jpg');
  const [profileName, setProfileName] = useState('Дмитрий Иванов');
  const [profileBio, setProfileBio] = useState('Любитель кино и сериалов 🎬');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [friends, setFriends] = useState([
    { id: '1', name: 'Анна К.', avatar: '', online: true },
    { id: '2', name: 'Михаил П.', avatar: '', online: false },
    { id: '3', name: 'Елена С.', avatar: '', online: true }
  ]);
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);
  const [messages, setMessages] = useState<{[key: string]: Array<{text: string, from: 'me' | 'friend', time: string}>}>({
    '1': [
      { text: 'Привет! Смотрел новый фильм?', from: 'friend', time: '14:32' },
      { text: 'Да, вчера посмотрел! Очень понравился', from: 'me', time: '14:35' }
    ],
    '2': [],
    '3': []
  });
  const [messageInput, setMessageInput] = useState('');

  const content: Content[] = [
    {
      id: '1',
      title: 'Тёмный Рубеж',
      year: '2024',
      genre: 'Боевик',
      rating: 4.5,
      reviewsCount: 1240,
      image: 'https://cdn.poehali.dev/projects/59f3fdc1-7a70-47a9-bcfe-9f9c881e11b4/files/9bbec604-fd98-40a5-95bd-e428aac2e32d.jpg',
      description: 'Захватывающий боевик о герое, который должен спасти город от неминуемой угрозы.',
      reviews: [
        { id: '1', author: 'Анна К.', avatar: '', rating: 5, text: 'Невероятные спецэффекты! Лучший боевик года.', date: '2 дня назад' },
        { id: '2', author: 'Михаил П.', avatar: '', rating: 4, text: 'Динамичный сюжет, не дает оторваться от экрана.', date: '5 дней назад' }
      ]
    },
    {
      id: '2',
      title: 'Неоновое Будущее',
      year: '2024',
      genre: 'Фантастика',
      rating: 4.8,
      reviewsCount: 2103,
      image: 'https://cdn.poehali.dev/projects/59f3fdc1-7a70-47a9-bcfe-9f9c881e11b4/files/f03f9437-1336-49f1-be37-844de656b3b6.jpg',
      description: 'Футуристическая история о мире, где технологии изменили всё.',
      reviews: [
        { id: '3', author: 'Елена С.', avatar: '', rating: 5, text: 'Визуально потрясающий сериал! Каждый кадр - шедевр.', date: '1 день назад' },
        { id: '4', author: 'Дмитрий В.', avatar: '', rating: 5, text: 'Лучшая фантастика за последние годы.', date: '3 дня назад' }
      ]
    },
    {
      id: '3',
      title: 'Два Сердца',
      year: '2024',
      genre: 'Драма',
      rating: 4.3,
      reviewsCount: 856,
      image: 'https://cdn.poehali.dev/projects/59f3fdc1-7a70-47a9-bcfe-9f9c881e11b4/files/9ff4bfce-258f-4089-9a39-7231eacac138.jpg',
      description: 'Трогательная история любви, которая заставит вас поверить в чувства.',
      reviews: [
        { id: '5', author: 'Ольга М.', avatar: '', rating: 5, text: 'Плакала весь фильм. Очень трогательно и искренне.', date: '4 дня назад' },
        { id: '6', author: 'Игорь Л.', avatar: '', rating: 4, text: 'Отличная игра актёров, красивая операторская работа.', date: '1 неделю назад' }
      ]
    }
  ];

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'search', label: 'Поиск', icon: 'Search' },
    { id: 'favorites', label: 'Избранное', icon: 'Heart' },
    { id: 'subscriptions', label: 'Подписки', icon: 'Bell' },
    { id: 'recommendations', label: 'Рекомендации', icon: 'Sparkles' },
    { id: 'profile', label: 'Профиль', icon: 'User' }
  ];

  const handleSubmitReview = () => {
    if (userRating > 0 && reviewText.trim()) {
      setUserRating(0);
      setReviewText('');
    }
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Icon
            key={star}
            name="Star"
            size={interactive ? 24 : 16}
            className={`${
              star <= rating
                ? 'fill-secondary text-secondary'
                : 'text-muted-foreground'
            } ${interactive ? 'cursor-pointer hover-scale' : ''}`}
            onClick={() => interactive && onRate?.(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Icon name="Play" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-primary">
              CinemaGoku
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                  activeTab === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon as any} size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
          <Button size="sm" className="hidden md:flex gap-2">
            <Icon name="Crown" size={16} />
            Премиум
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <>
            <section className="relative h-[500px] rounded-2xl overflow-hidden mb-12">
              <img
                src={content[0].image}
                alt="Hero"
                className="w-full h-full object-cover"
              />
              <div className="gradient-overlay" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <Badge className="mb-4 bg-secondary/90 text-secondary-foreground">
                  🔥 Популярное сейчас
                </Badge>
                <h2 className="text-4xl md:text-6xl font-bold mb-4 max-w-2xl">
                  {content[0].title}
                </h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                  {content[0].description}
                </p>
                <div className="flex gap-4">
                  <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                    <Icon name="Play" size={20} />
                    Смотреть
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="lg"
                        variant="outline"
                        className="gap-2 bg-background/80 backdrop-blur"
                        onClick={() => setSelectedContent(content[0])}
                      >
                        <Icon name="Info" size={20} />
                        Подробнее
                      </Button>
                    </DialogTrigger>
                    {selectedContent && (
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl">{selectedContent.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-6">
                          <img
                            src={selectedContent.image}
                            alt={selectedContent.title}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{selectedContent.year}</span>
                            <span>•</span>
                            <span>{selectedContent.genre}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              {renderStars(Math.round(selectedContent.rating))}
                              <span className="ml-1">{selectedContent.rating}</span>
                            </div>
                          </div>
                          <p className="text-base">{selectedContent.description}</p>

                          <div className="border-t border-border pt-6">
                            <h3 className="text-xl font-semibold mb-4">
                              Рецензии ({selectedContent.reviewsCount})
                            </h3>

                            <Card className="mb-6 bg-muted/30">
                              <CardContent className="p-6">
                                <h4 className="font-semibold mb-3">Оставьте свою рецензию</h4>
                                <div className="space-y-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground mb-2">Ваша оценка:</p>
                                    {renderStars(userRating, true, setUserRating)}
                                  </div>
                                  <Textarea
                                    placeholder="Поделитесь своим мнением о фильме..."
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    className="min-h-24"
                                  />
                                  <Button
                                    onClick={handleSubmitReview}
                                    disabled={userRating === 0 || !reviewText.trim()}
                                    className="gap-2"
                                  >
                                    <Icon name="Send" size={16} />
                                    Опубликовать
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>

                            <div className="space-y-4">
                              {selectedContent.reviews.map((review) => (
                                <Card key={review.id}>
                                  <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                      <Avatar>
                                        <AvatarImage src={review.avatar} />
                                        <AvatarFallback>{review.author[0]}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                          <p className="font-semibold">{review.author}</p>
                                          <span className="text-xs text-muted-foreground">
                                            {review.date}
                                          </span>
                                        </div>
                                        <div className="mb-2">{renderStars(review.rating)}</div>
                                        <p className="text-sm text-muted-foreground">{review.text}</p>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    )}
                  </Dialog>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">🔥 Популярное</h3>
                <Button variant="ghost" className="gap-2">
                  Смотреть всё
                  <Icon name="ArrowRight" size={16} />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.map((item) => (
                  <Card
                    key={item.id}
                    className="group overflow-hidden hover-scale cursor-pointer"
                    onClick={() => setSelectedContent(item)}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="rounded-full w-8 h-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Icon name="Heart" size={16} />
                        </Button>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <Badge className="bg-primary/90 backdrop-blur">
                          <Icon name="Star" size={12} className="mr-1 fill-white" />
                          {item.rating}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-lg mb-2 line-clamp-1">{item.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <span>{item.year}</span>
                        <span>•</span>
                        <span>{item.genre}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="MessageSquare" size={14} className="text-muted-foreground" />
                        <span className="text-muted-foreground">{item.reviewsCount} рецензий</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">✨ Рекомендации для вас</h3>
                <Button variant="ghost" className="gap-2">
                  Обновить
                  <Icon name="RefreshCw" size={16} />
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[...content, ...content].slice(0, 6).map((item, index) => (
                  <Card
                    key={`rec-${index}`}
                    className="group overflow-hidden hover-scale cursor-pointer"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden mb-6">
              <div className="relative h-48 group cursor-pointer">
                <img
                  src={profileBanner}
                  alt="Banner"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="gap-2"
                    onClick={() => {
                      const url = prompt('Введите URL изображения для фона:');
                      if (url) setProfileBanner(url);
                    }}
                  >
                    <Icon name="Camera" size={16} />
                    Изменить фон
                  </Button>
                </div>
              </div>
              <CardContent className="relative pt-16 pb-6">
                <div className="absolute -top-16 left-6">
                  <div className="relative group cursor-pointer">
                    <Avatar className="w-32 h-32 border-4 border-background">
                      <AvatarImage src={profileAvatar} />
                      <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                        {profileName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-full">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="gap-2 rounded-full"
                        onClick={() => {
                          const url = prompt('Введите URL изображения для аватара:');
                          if (url) setProfileAvatar(url);
                        }}
                      >
                        <Icon name="Camera" size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="ml-44 flex items-start justify-between">
                  <div>
                    {isEditingProfile ? (
                      <div className="space-y-3 max-w-md">
                        <input
                          type="text"
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          className="w-full px-3 py-2 bg-muted rounded-lg text-lg font-semibold"
                        />
                        <Textarea
                          value={profileBio}
                          onChange={(e) => setProfileBio(e.target.value)}
                          className="w-full"
                          rows={2}
                        />
                      </div>
                    ) : (
                      <>
                        <h2 className="text-3xl font-bold mb-1">{profileName}</h2>
                        <p className="text-muted-foreground mb-4">{profileBio}</p>
                      </>
                    )}
                    <div className="flex gap-6 text-sm">
                      <div>
                        <span className="font-semibold text-foreground">42</span>
                        <span className="text-muted-foreground ml-1">Просмотрено</span>
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">{friends.length}</span>
                        <span className="text-muted-foreground ml-1">Друзей</span>
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">15</span>
                        <span className="text-muted-foreground ml-1">Рецензий</span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    variant={isEditingProfile ? "default" : "outline"}
                    className="gap-2"
                  >
                    <Icon name={isEditingProfile ? "Check" : "Pencil"} size={16} />
                    {isEditingProfile ? 'Сохранить' : 'Редактировать'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Друзья</h3>
                    <Button size="sm" variant="ghost" className="gap-2">
                      <Icon name="UserPlus" size={16} />
                      Добавить
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {friends.map((friend) => (
                      <div
                        key={friend.id}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                        onClick={() => setSelectedFriend(friend.id)}
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={friend.avatar} />
                            <AvatarFallback>{friend.name[0]}</AvatarFallback>
                          </Avatar>
                          {friend.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{friend.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {friend.online ? 'В сети' : 'Не в сети'}
                          </p>
                        </div>
                        <Icon name="MessageCircle" size={18} className="text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Избранное</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {content.slice(0, 6).map((item) => (
                      <div
                        key={item.id}
                        className="aspect-[2/3] rounded-lg overflow-hidden hover-scale cursor-pointer"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab !== 'home' && activeTab !== 'profile' && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <Icon
                name={navItems.find((item) => item.id === activeTab)?.icon as any}
                size={32}
                className="text-muted-foreground"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {navItems.find((item) => item.id === activeTab)?.label}
            </h2>
            <p className="text-muted-foreground">Раздел в разработке</p>
          </div>
        )}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-around py-2">
          {navItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 p-2 ${
                activeTab === item.id ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name={item.icon as any} size={20} />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {selectedFriend && (
        <Dialog open={!!selectedFriend} onOpenChange={() => setSelectedFriend(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={friends.find(f => f.id === selectedFriend)?.avatar} />
                  <AvatarFallback>{friends.find(f => f.id === selectedFriend)?.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p>{friends.find(f => f.id === selectedFriend)?.name}</p>
                  <p className="text-sm text-muted-foreground font-normal">
                    {friends.find(f => f.id === selectedFriend)?.online ? 'В сети' : 'Не в сети'}
                  </p>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col h-[500px]">
              <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-muted/20 rounded-lg mb-4">
                {(messages[selectedFriend] || []).length === 0 ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center">
                      <Icon name="MessageCircle" size={48} className="mx-auto mb-2 opacity-50" />
                      <p>Начните общение</p>
                    </div>
                  </div>
                ) : (
                  messages[selectedFriend].map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          msg.from === 'me'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${
                          msg.from === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="flex gap-2">
                <Textarea
                  placeholder="Напишите сообщение..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="resize-none"
                  rows={2}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      if (messageInput.trim() && selectedFriend) {
                        const newMessage = {
                          text: messageInput,
                          from: 'me' as const,
                          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
                        };
                        setMessages({
                          ...messages,
                          [selectedFriend]: [...(messages[selectedFriend] || []), newMessage]
                        });
                        setMessageInput('');
                      }
                    }
                  }}
                />
                <Button
                  size="icon"
                  onClick={() => {
                    if (messageInput.trim() && selectedFriend) {
                      const newMessage = {
                        text: messageInput,
                        from: 'me' as const,
                        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
                      };
                      setMessages({
                        ...messages,
                        [selectedFriend]: [...(messages[selectedFriend] || []), newMessage]
                      });
                      setMessageInput('');
                    }
                  }}
                  disabled={!messageInput.trim()}
                >
                  <Icon name="Send" size={18} />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Index;