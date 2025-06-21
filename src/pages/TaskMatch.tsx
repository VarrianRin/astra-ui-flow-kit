
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, BookOpen, Clock, Star, Download } from 'lucide-react';

const TaskMatch = () => {
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [taskType, setTaskType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const mockTasks = [
    {
      id: 1,
      title: 'Решение квадратных уравнений',
      subject: 'Математика',
      grade: '9 класс',
      difficulty: 'Средний',
      type: 'Упражнения',
      duration: '30 мин',
      rating: 4.8,
      description: 'Набор задач на решение квадратных уравнений различными способами',
      tasks_count: 15
    },
    {
      id: 2,
      title: 'Анализ литературного произведения',
      subject: 'Литература',
      grade: '10 класс',
      difficulty: 'Высокий',
      type: 'Творческое задание',
      duration: '45 мин',
      rating: 4.5,
      description: 'Комплексный анализ характеров героев в произведениях русской классики',
      tasks_count: 8
    },
    {
      id: 3,
      title: 'Основы химических реакций',
      subject: 'Химия',
      grade: '8 класс',
      difficulty: 'Легкий',
      type: 'Тест',
      duration: '20 мин',
      rating: 4.3,
      description: 'Проверочный тест по основам химических реакций и их типам',
      tasks_count: 20
    }
  ];

  const handleSearch = () => {
    console.log('Searching tasks with:', { subject, grade, topic, difficulty, taskType, searchQuery });
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-h1 font-bold text-foreground mb-4">Подбор заданий</h1>
          <p className="text-text-body text-lg">
            ИИ поможет найти идеальные задания для ваших учеников
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filters sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-soft-40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Фильтры
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="search">Поиск по ключевым словам</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-body w-4 h-4" />
                    <Input
                      id="search"
                      placeholder="Введите тему или ключевые слова"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Предмет</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите предмет" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Математика</SelectItem>
                      <SelectItem value="russian">Русский язык</SelectItem>
                      <SelectItem value="literature">Литература</SelectItem>
                      <SelectItem value="physics">Физика</SelectItem>
                      <SelectItem value="chemistry">Химия</SelectItem>
                      <SelectItem value="biology">Биология</SelectItem>
                      <SelectItem value="history">История</SelectItem>
                      <SelectItem value="geography">География</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grade">Класс</Label>
                  <Select value={grade} onValueChange={setGrade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите класс" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 11 }, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} класс
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Тема урока</Label>
                  <Input
                    id="topic"
                    placeholder="Например: Квадратные уравнения"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Уровень сложности</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите уровень" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Легкий</SelectItem>
                      <SelectItem value="medium">Средний</SelectItem>
                      <SelectItem value="hard">Высокий</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taskType">Тип задания</Label>
                  <Select value={taskType} onValueChange={setTaskType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="test">Тест</SelectItem>
                      <SelectItem value="exercise">Упражнения</SelectItem>
                      <SelectItem value="creative">Творческое задание</SelectItem>
                      <SelectItem value="practical">Практическая работа</SelectItem>
                      <SelectItem value="project">Проект</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleSearch}
                  className="w-full bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end hover:opacity-90 transition-opacity duration-200"
                >
                  Найти задания
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-h3 font-semibold">Результаты поиска</h2>
              <p className="text-text-body">Найдено: {mockTasks.length} заданий</p>
            </div>

            <div className="space-y-6">
              {mockTasks.map((task) => (
                <Card key={task.id} className="shadow-soft-40 hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{task.title}</CardTitle>
                        <CardDescription className="text-text-body">
                          {task.description}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-1 ml-4">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{task.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-text-body" />
                        <span className="text-sm text-text-body">{task.subject}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-text-body">{task.grade}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-text-body" />
                        <span className="text-sm text-text-body">{task.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-text-body">{task.tasks_count} заданий</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.difficulty === 'Легкий' 
                          ? 'bg-green-100 text-green-800'
                          : task.difficulty === 'Средний'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {task.difficulty}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {task.type}
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" size="sm">
                        Предварительный просмотр
                      </Button>
                      <Button 
                        size="sm"
                        className="bg-gradient-to-r from-accent-start to-accent-end hover:opacity-90 transition-opacity duration-200 text-white"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Скачать
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TaskMatch;
