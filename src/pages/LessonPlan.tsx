
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Star, Copy, FileText, Download, Loader2 } from 'lucide-react';

const LessonPlan = () => {
  const [subject, setSubject] = useState('');
  const [selectedClasses, setSelectedClasses] = useState<number[]>([]);
  const [topic, setTopic] = useState('');
  const [comment, setComment] = useState('');
  const [includeHomework, setIncludeHomework] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [chatInput, setChatInput] = useState('');

  const classes = Array.from({ length: 11 }, (_, i) => i + 1);

  const handleClassToggle = (classNum: number) => {
    setSelectedClasses(prev => 
      prev.includes(classNum) 
        ? prev.filter(c => c !== classNum)
        : [...prev, classNum]
    );
  };

  const handleGenerate = async () => {
    if (!subject || !topic || selectedClasses.length === 0) return;
    
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

  const handleChatSubmit = () => {
    if (!chatInput.trim() || chatMessages.length >= 8) return;
    
    const newMessages = [
      ...chatMessages,
      { role: 'user' as const, content: chatInput },
      { role: 'assistant' as const, content: 'Спасибо за уточнение. Я внесу эти изменения в план урока.' }
    ];
    setChatMessages(newMessages);
    setChatInput('');
  };

  const history = [
    { title: 'Математика 5 класс - Дроби', timestamp: '15.06.2024 14:30', rating: 5 },
    { title: 'Русский язык 7 класс - Причастия', timestamp: '14.06.2024 10:15', rating: 4 },
    { title: 'История 9 класс - ВОВ', timestamp: '13.06.2024 16:45', rating: 5 },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Main form - 720px */}
          <div className="flex-none" style={{ width: '720px' }}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Создание плана урока</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Пример
                    </Button>
                    <Button variant="outline" size="sm">
                      Инструкция
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
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
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Составляем план...
                    </>
                  ) : (
                    'Составить план'
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Generated plan result */}
            {generatedPlan && (
              <Card className="mt-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Готовый план урока</CardTitle>
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
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-line text-sm text-gray-700 mb-6 p-4 bg-gray-50 rounded-lg">
                    {generatedPlan}
                  </div>

                  {/* Chat section - max 4 turns (8 messages) */}
                  <div className="border-t pt-6">
                    <h3 className="font-medium mb-4">Уточнить план урока</h3>
                    
                    {chatMessages.length > 0 && (
                      <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                        {chatMessages.map((message, index) => (
                          <div
                            key={index}
                            className={`p-3 rounded-lg ${
                              message.role === 'user'
                                ? 'bg-blue-50 ml-8'
                                : 'bg-gray-50 mr-8'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {chatMessages.length < 8 && (
                      <div className="flex space-x-2">
                        <Textarea 
                          placeholder="Что нужно изменить или добавить в план урока?"
                          rows={2}
                          className="flex-1"
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                        />
                        <Button onClick={handleChatSubmit} disabled={!chatInput.trim()}>
                          Отправить
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - 260px */}
          <div className="flex-none" style={{ width: '260px' }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">История планов</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LessonPlan;
