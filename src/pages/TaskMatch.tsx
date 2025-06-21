
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Upload, Clock, Star, Loader2, ChevronDown } from 'lucide-react';

const TaskMatch = () => {
  const [subject, setSubject] = useState('');
  const [selectedClasses, setSelectedClasses] = useState<number[]>([]);
  const [topic, setTopic] = useState('');
  const [quantity, setQuantity] = useState(5);
  const [inputMethod, setInputMethod] = useState<'photo' | 'text'>('text');
  const [comment, setComment] = useState('');
  const [showSolutions, setShowSolutions] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTasks, setGeneratedTasks] = useState<any[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [expandedTask, setExpandedTask] = useState<number | null>(null);

  const classes = Array.from({ length: 11 }, (_, i) => i + 1);

  const handleClassToggle = (classNum: number) => {
    setSelectedClasses(prev => 
      prev.includes(classNum) 
        ? prev.filter(c => c !== classNum)
        : [...prev, classNum]
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
  };

  const handleGenerate = async () => {
    if (!subject || !topic || selectedClasses.length === 0) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      const mockTasks = Array.from({ length: quantity }, (_, i) => ({
        id: i + 1,
        question: `Задача ${i + 1}: Решите уравнение и найдите значение переменной x в выражении...`,
        solution: `Решение задачи ${i + 1}:\n1. Приведем подобные слагаемые\n2. Выполним операции\n3. Получим ответ: x = ${i + 2}`,
        difficulty: ['Легкая', 'Средняя', 'Сложная'][Math.floor(Math.random() * 3)],
        points: Math.floor(Math.random() * 5) + 1
      }));
      setGeneratedTasks(mockTasks);
      setIsGenerating(false);
    }, 2000);
  };

  const history = [
    { title: 'Алгебра 8 класс - Квадратные уравнения', timestamp: '15.06.2024 14:30', rating: 5 },
    { title: 'Геометрия 9 класс - Треугольники', timestamp: '14.06.2024 10:15', rating: 4 },
    { title: 'Математика 6 класс - Дроби', timestamp: '13.06.2024 16:45', rating: 5 },
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
                  <CardTitle className="text-2xl">Подбор заданий</CardTitle>
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
                      <SelectItem value="algebra">Алгебра</SelectItem>
                      <SelectItem value="geometry">Геометрия</SelectItem>
                      <SelectItem value="physics">Физика</SelectItem>
                      <SelectItem value="chemistry">Химия</SelectItem>
                      <SelectItem value="russian">Русский язык</SelectItem>
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
                  <Label>Количество заданий: {quantity}</Label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1</span>
                    <span>10</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Способ ввода</Label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="inputMethod"
                        value="photo"
                        checked={inputMethod === 'photo'}
                        onChange={(e) => setInputMethod(e.target.value as 'photo')}
                        className="text-primary"
                      />
                      <span>Загрузить фото</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="inputMethod"
                        value="text"
                        checked={inputMethod === 'text'}
                        onChange={(e) => setInputMethod(e.target.value as 'text')}
                        className="text-primary"
                      />
                      <span>Ввести текст</span>
                    </label>
                  </div>
                </div>

                {inputMethod === 'photo' && (
                  <div className="space-y-2">
                    <Label>Загрузка файлов</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors duration-200">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-2">
                        Перетащите фото заданий сюда или нажмите для выбора
                      </p>
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="photo-upload"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => document.getElementById('photo-upload')?.click()}
                      >
                        Выбрать фото
                      </Button>
                    </div>
                    {selectedFiles.length > 0 && (
                      <div className="text-sm text-gray-600">
                        Выбрано файлов: {selectedFiles.length}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="solutions"
                    checked={showSolutions}
                    onChange={(e) => setShowSolutions(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="solutions">Показать решения</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comment">Комментарий (опционально)</Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Дополнительные требования к заданиям"
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !subject || !topic || selectedClasses.length === 0}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Подбираем задания...
                    </>
                  ) : (
                    'Подобрать задания'
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Generated tasks result */}
            {generatedTasks.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-xl">Подобранные задания</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {generatedTasks.map((task) => (
                      <div key={task.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Задание {task.id}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              task.difficulty === 'Легкая' ? 'bg-green-100 text-green-800' :
                              task.difficulty === 'Средняя' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {task.difficulty}
                            </span>
                            <span className="text-sm text-gray-500">{task.points} балл(ов)</span>
                          </div>
                          {showSolutions && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                            >
                              <ChevronDown className={`w-4 h-4 transition-transform ${
                                expandedTask === task.id ? 'rotate-180' : ''
                              }`} />
                            </Button>
                          )}
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{task.question}</p>
                        
                        {showSolutions && expandedTask === task.id && (
                          <div className="border-t pt-3 mt-3">
                            <h4 className="font-medium text-sm mb-2">Решение:</h4>
                            <p className="text-sm text-gray-600 whitespace-pre-line bg-gray-50 p-3 rounded">
                              {task.solution}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - 260px */}
          <div className="flex-none" style={{ width: '260px' }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">История подборок</CardTitle>
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

export default TaskMatch;
