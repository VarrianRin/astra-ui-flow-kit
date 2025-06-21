
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Star, Copy, FileText, Download } from 'lucide-react';

const LessonPlan = () => {
  const [subject, setSubject] = useState('');
  const [selectedClasses, setSelectedClasses] = useState<number[]>([]);
  const [topic, setTopic] = useState('');
  const [comment, setComment] = useState('');
  const [includeHomework, setIncludeHomework] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState('');

  const classes = Array.from({ length: 11 }, (_, i) => i + 1);

  const handleClassToggle = (classNum: number) => {
    setSelectedClasses(prev => 
      prev.includes(classNum) 
        ? prev.filter(c => c !== classNum)
        : [...prev, classNum]
    );
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedPlan(`План урока по теме "${topic}"

1. Организационный момент (2 мин)
   - Приветствие учащихся
   - Проверка готовности к уроку

2. Актуализация знаний (5 мин)
   - Повторение предыдущей темы
   - Связь с новым материалом

3. Изучение нового материала (20 мин)
   - Объяснение основных понятий
   - Примеры и демонстрация
   - Интерактивные элементы

4. Закрепление материала (10 мин)
   - Практические задания
   - Работа у доски

5. Подведение итогов (3 мин)
   - Выводы по теме
   - Ответы на вопросы

${includeHomework ? `
6. Домашнее задание
   - Учебник стр. 45-47
   - Упражнения 1-5
` : ''}`);
      setIsGenerating(false);
    }, 2000);
  };

  const history = [
    { title: 'Математика 5 класс', timestamp: '15.06.2024 14:30', rating: 5 },
    { title: 'Русский язык 7 класс', timestamp: '14.06.2024 10:15', rating: 4 },
    { title: 'История 9 класс', timestamp: '13.06.2024 16:45', rating: 5 },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Main form */}
          <div className="flex-1">
            <Card className="p-6 max-w-3xl">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Создание плана урока</h1>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Пример
                  </Button>
                  <Button variant="outline" size="sm">
                    Инструкция
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Предмет</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите предмет" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Математика</SelectItem>
                      <SelectItem value="russian">Русский язык</SelectItem>
                      <SelectItem value="history">История</SelectItem>
                      <SelectItem value="physics">Физика</SelectItem>
                      <SelectItem value="chemistry">Химия</SelectItem>
                      <SelectItem value="biology">Биология</SelectItem>
                      <SelectItem value="geography">География</SelectItem>
                      <SelectItem value="literature">Литература</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Класс</Label>
                  <div className="flex flex-wrap gap-2">
                    {classes.map(classNum => (
                      <button
                        key={classNum}
                        onClick={() => handleClassToggle(classNum)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedClasses.includes(classNum)
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {classNum}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Тема урока</Label>
                  <Input
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Введите тему урока"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">Комментарий (опционально)</Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Дополнительные пожелания к плану урока"
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="homework"
                    checked={includeHomework}
                    onChange={(e) => setIncludeHomework(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="homework">Включить домашнее задание</Label>
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !subject || !topic || selectedClasses.length === 0}
                  className="w-full"
                >
                  {isGenerating ? 'Составляем план...' : 'Составить план'}
                </Button>
              </div>
            </Card>

            {/* Generated plan result */}
            {generatedPlan && (
              <Card className="p-6 mt-6 max-w-3xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Готовый план урока</h2>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-2" />
                      Копировать
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Word
                    </Button>
                  </div>
                </div>
                
                <div className="whitespace-pre-line text-sm text-gray-700 mb-6 p-4 bg-gray-50 rounded-lg">
                  {generatedPlan}
                </div>

                {/* Chat section */}
                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">Уточнить план урока</h3>
                  <div className="flex space-x-2">
                    <Textarea 
                      placeholder="Что нужно изменить или добавить в план урока?"
                      rows={2}
                      className="flex-1"
                    />
                    <Button>Отправить</Button>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar with history */}
          <div className="w-64">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">История планов</h3>
              <div className="space-y-3">
                {history.map((item, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.timestamp}
                      </div>
                      <div className="flex items-center">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LessonPlan;
