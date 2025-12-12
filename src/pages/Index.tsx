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

        {activeTab !== 'home' && (
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
    </div>
  );
};

export default Index;