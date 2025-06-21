
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, BookOpen, Search, CheckCircle, Star, Users, Clock, FileCheck } from "lucide-react";

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Мария Петровна",
      role: "Учитель математики",
      avatar: "MP",
      quote: "Astra ИИ помогает мне экономить 4 часа в день! Проверка работ стала автоматической, а планы уроков составляются за минуты."
    },
    {
      name: "Александр Иванов", 
      role: "Учитель физики",
      avatar: "АИ",
      quote: "Невероятно удобный инструмент для подбора заданий. Теперь могу легко найти задачи нужного уровня сложности для каждого ученика."
    },
    {
      name: "Елена Смирнова",
      role: "Учитель русского языка", 
      avatar: "ЕС",
      quote: "Качество автоматической проверки поражает! ИИ находит даже те ошибки, которые я могла бы пропустить при быстрой проверке."
    }
  ];

  const features = [
    {
      icon: <FileCheck className="w-8 h-8" />,
      title: "Проверка работ",
      description: "Автоматическая проверка домашних заданий и контрольных работ с детальной обратной связью",
      action: "Попробовать"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Подбор заданий", 
      description: "Найдите идеальные задания по любой теме с учетом уровня сложности и требований",
      action: "Попробовать"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "План урока",
      description: "Создание структурированных планов уроков с учетом ФГОС и современных методик",
      action: "Попробовать"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-neutral-100 font-inter">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-neutral-900">Astra ИИ</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-neutral-900 hover:text-primary">
                Войти
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-white transition-all duration-200">
                Регистрация
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-h1 font-bold text-neutral-900 mb-6 leading-tight">
              Цифровой ассистент учителя.<br />
              <span className="text-primary">Экономьте до 90% времени</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Автоматизируйте проверку работ, создавайте планы уроков и подбирайте задания с помощью искусственного интеллекта
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg transition-all duration-200 transform hover:scale-105"
            >
              Начать бесплатно
            </Button>
          </div>
        </div>
      </section>

      {/* Trust & Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          {/* Testimonials Carousel */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-h2 font-bold text-center text-neutral-900 mb-12">
              Что говорят учителя
            </h2>
            <div className="relative">
              <Card className="p-8 border-0 shadow-soft-40">
                <div className="flex items-center justify-between mb-4">
                  <button 
                    onClick={prevTestimonial}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <div className="text-center flex-1">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-lg mx-auto mb-4">
                      {testimonials[currentTestimonial].avatar}
                    </div>
                    <p className="text-lg text-gray-700 mb-4 italic">
                      "{testimonials[currentTestimonial].quote}"
                    </p>
                    <div>
                      <p className="font-semibold text-neutral-900">
                        {testimonials[currentTestimonial].name}
                      </p>
                      <p className="text-gray-600">
                        {testimonials[currentTestimonial].role}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={nextTestimonial}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </Card>
            </div>
          </div>

          {/* KPI Stats */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 text-center border-0 shadow-soft-40 hover:shadow-lg transition-shadow">
              <Users className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-3xl font-bold text-neutral-900 mb-2">100+</div>
              <div className="text-gray-600">активных учителей</div>
            </Card>
            <Card className="p-6 text-center border-0 shadow-soft-40 hover:shadow-lg transition-shadow">
              <Clock className="w-12 h-12 text-success mx-auto mb-4" />
              <div className="text-3xl font-bold text-neutral-900 mb-2">20 ч/нед</div>
              <div className="text-gray-600">экономии времени</div>
            </Card>
            <Card className="p-6 text-center border-0 shadow-soft-40 hover:shadow-lg transition-shadow">
              <Star className="w-12 h-12 text-accent mx-auto mb-4" />
              <div className="text-3xl font-bold text-neutral-900 mb-2">2 млн</div>
              <div className="text-gray-600">проверенных заданий</div>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-h2 font-bold text-neutral-900 mb-4">
              Как это работает
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Три простых инструмента, которые изменят ваш подход к преподаванию
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-8 border-0 shadow-soft-40 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="text-primary mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-h3 font-semibold text-neutral-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200"
                >
                  {feature.action}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-h2 font-bold mb-4">
              Готовы начать экономить время?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Присоединяйтесь к сотням учителей, которые уже используют Astra ИИ
            </p>
            <Button 
              size="lg" 
              className="bg-accent text-neutral-900 hover:bg-accent/90 px-8 py-4 text-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Начать бесплатно
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-neutral-900 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="text-xl font-bold">Astra ИИ</span>
              </div>
              <p className="text-gray-400">
                Цифровой ассистент для современных учителей
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Продукт</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Проверка работ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Подбор заданий</a></li>
                <li><a href="#" className="hover:text-white transition-colors">План урока</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Обратная связь</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Документы</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Пользовательское соглашение</a></li>
                <li>
                  <div className="flex items-center space-x-2 mt-4">
                    <span className="text-sm">RU</span>
                    <span className="text-gray-600">|</span>
                    <span className="text-sm text-gray-400">EN</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Astra ИИ. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
