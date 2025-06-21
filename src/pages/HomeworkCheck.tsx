
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Link as LinkIcon, QrCode, Users, Clock, Star, Loader2, Eye, CheckCircle } from 'lucide-react';

const HomeworkCheck = () => {
  const [subject, setSubject] = useState('');
  const [selectedClasses, setSelectedClasses] = useState<number[]>([]);
  const [quantity, setQuantity] = useState(10);
  const [method, setMethod] = useState<'link' | 'manual'>('link');
  const [comment, setComment] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [password, setPassword] = useState('');
  const [students, setStudents] = useState<Array<{name: string, uploaded: boolean}>>([]);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const classes = Array.from({ length: 11 }, (_, i) => i + 1);

  const handleClassToggle = (classNum: number) => {
    setSelectedClasses(prev => 
      prev.includes(classNum) 
        ? prev.filter(c => c !== classNum)
        : [...prev, classNum]
    );
  };

  const handleStart = async () => {
    if (!subject || selectedClasses.length === 0) return;
    
    setIsStarted(true);
    
    if (method === 'link') {
      // Generate link and QR code
      setGeneratedLink('https://homework.astrai.ru/submit/abc123def');
      setQrCode('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="black"/></svg>');
      setPassword('УРОК2024');
      
      // Simulate students submitting
      const mockStudents = Array.from({ length: quantity }, (_, i) => ({
        name: `Ученик ${i + 1}`,
        uploaded: Math.random() > 0.3
      }));
      setStudents(mockStudents);
      setUploadedCount(mockStudents.filter(s => s.uploaded).length);
    } else {
      // Manual upload zones
      const mockStudents = Array.from({ length: quantity }, (_, i) => ({
        name: `Ученик ${i + 1}`,
        uploaded: false
      }));
      setStudents(mockStudents);
    }
  };

  const handleStudentNameChange = (index: number, name: string) => {
    setStudents(prev => prev.map((student, i) => 
      i === index ? { ...student, name } : student
    ));
  };

  const history = [
    { title: 'Математика 9А - Контрольная №3', timestamp: '15.06.2024 14:30', rating: 5 },
    { title: 'Русский язык 8Б - Сочинение', timestamp: '14.06.2024 10:15', rating: 4 },
    { title: 'Физика 10А - Лабораторная',timestamp: '13.06.2024 16:45', rating: 5 },
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
                  <CardTitle className="text-2xl">Проверка домашних работ</CardTitle>
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
                      <SelectItem value="physics">Физика</SelectItem>
                      <SelectItem value="chemistry">Химия</SelectItem>
                      <SelectItem value="biology">Биология</SelectItem>
                      <SelectItem value="history">История</SelectItem>
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
                  <Label>Количество учеников</Label>
                  <Select value={quantity.toString()} onValueChange={(value) => setQuantity(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 30 }, (_, i) => i + 1).map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} учеников
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label>Способ сбора работ</Label>
                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="method"
                        value="link"
                        checked={method === 'link'}
                        onChange={(e) => setMethod(e.target.value as 'link')}
                        className="text-primary"
                      />
                      <span>Создать ссылку для учеников</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="method"
                        value="manual"
                        checked={method === 'manual'}
                        onChange={(e) => setMethod(e.target.value as 'manual')}
                        className="text-primary"
                      />
                      <span>Загрузить работы вручную</span>
                    </label>
                  </div>
                </div>

                {/* Conditional area based on method */}
                {method === 'link' && generatedLink && (
                  <div className="border rounded-lg p-4 bg-blue-50">
                    <h3 className="font-medium mb-3">Ссылка для учеников</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <LinkIcon className="w-4 h-4" />
                        <code className="bg-white px-2 py-1 rounded text-sm flex-1">
                          {generatedLink}
                        </code>
                        <Button size="sm" variant="outline">Копировать</Button>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <QrCode className="w-4 h-4" />
                          <span className="text-sm">QR-код</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Пароль:</span>
                          <code className="bg-white px-2 py-1 rounded text-sm font-mono">
                            {password}
                          </code>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Сохранить шаблон</Button>
                      </div>
                    </div>
                  </div>
                )}

                {method === 'manual' && isStarted && (
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Загрузка работ</h3>
                      <Button size="sm" variant="outline">Подставить из шаблона</Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                      {students.map((student, index) => (
                        <div key={index} className="border rounded p-3 space-y-2">
                          <Input
                            placeholder={`Ученик ${index + 1}`}
                            value={student.name}
                            onChange={(e) => handleStudentNameChange(index, e.target.value)}
                            className="text-sm"
                          />
                          <div className="border-2 border-dashed border-gray-300 rounded p-2 text-center">
                            <Upload className="w-4 h-4 mx-auto mb-1 text-gray-400" />
                            <p className="text-xs text-gray-500">Загрузить работу</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="comment">Комментарий (опционально)</Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Критерии оценки или особые требования"
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={handleStart}
                  disabled={!subject || selectedClasses.length === 0}
                  className="w-full"
                >
                  Начать проверку
                </Button>
              </CardContent>
            </Card>

            {/* Session status */}
            {isStarted && method === 'link' && (
              <Card className="mt-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Статус сбора работ</CardTitle>
                    <div className="text-lg font-semibold text-primary">
                      {uploadedCount} из {quantity} работ загружено
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-primary h-3 rounded-full transition-all duration-300"
                        style={{ width: `${(uploadedCount / quantity) * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      {students.map((student, index) => (
                        <div 
                          key={index} 
                          className={`p-3 rounded-lg border ${
                            student.uploaded 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {student.uploaded ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <Clock className="w-4 h-4 text-gray-400" />
                            )}
                            <span className="text-sm">{student.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Предварительный просмотр
                      </Button>
                      <Button disabled={uploadedCount === 0}>
                        Начать автопроверку ({uploadedCount} работ)
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - 260px */}
          <div className="flex-none" style={{ width: '260px' }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">История проверок</CardTitle>
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

export default HomeworkCheck;
