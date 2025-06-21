
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, CheckCircle, XCircle, Clock, Eye, MessageSquare } from 'lucide-react';

const HomeworkCheck = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const mockHomeworks = [
    {
      id: 1,
      studentName: 'Иванов Петр',
      subject: 'Математика',
      assignment: 'Квадратные уравнения - Контрольная работа №3',
      submittedAt: '2024-06-20 14:30',
      status: 'checked',
      grade: 4,
      aiScore: 85,
      feedback: 'Хорошее понимание материала. Небольшие ошибки в вычислениях в задаче №3.',
      file: 'math_homework_petrov.pdf'
    },
    {
      id: 2,
      studentName: 'Смирнова Анна',
      subject: 'Русский язык',
      assignment: 'Сочинение по произведению "Война и мир"',
      submittedAt: '2024-06-20 16:45',
      status: 'pending',
      grade: null,
      aiScore: null,
      feedback: null,
      file: 'essay_smirnova.docx'
    },
    {
      id: 3,
      studentName: 'Козлов Дмитрий',
      subject: 'Физика',
      assignment: 'Лабораторная работа: Закон Ома',
      submittedAt: '2024-06-20 18:20',
      status: 'processing',
      grade: null,
      aiScore: null,
      feedback: null,
      file: 'physics_lab_kozlov.pdf'
    }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
  };

  const handleSubmitForCheck = async () => {
    if (selectedFiles.length === 0) return;
    
    setIsUploading(true);
    // Simulate API call
    setTimeout(() => {
      setIsUploading(false);
      setSelectedFiles([]);
      console.log('Files uploaded for AI checking');
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'checked':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'checked':
        return <CheckCircle className="w-4 h-4" />;
      case 'processing':
        return <Clock className="w-4 h-4" />;
      case 'pending':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'checked':
        return 'Проверено';
      case 'processing':
        return 'Обрабатывается';
      case 'pending':
        return 'Ожидает проверки';
      default:
        return 'Неизвестно';
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-h1 font-bold text-foreground mb-4">Проверка работ</h1>
          <p className="text-text-body text-lg">
            ИИ поможет быстро проверить домашние задания и дать обратную связь
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload section */}
          <div className="lg:col-span-1">
            <Card className="shadow-soft-40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Загрузить работы
                </CardTitle>
                <CardDescription>
                  Загрузите файлы для автоматической проверки
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="files">Выберите файлы</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors duration-200">
                    <Upload className="w-8 h-8 text-text-body mx-auto mb-2" />
                    <p className="text-sm text-text-body mb-2">
                      Перетащите файлы сюда или нажмите для выбора
                    </p>
                    <Input
                      id="files"
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => document.getElementById('files')?.click()}
                    >
                      Выбрать файлы
                    </Button>
                  </div>
                  <p className="text-xs text-text-body">
                    Поддерживаемые форматы: PDF, DOC, DOCX, TXT
                  </p>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>Выбранные файлы:</Label>
                    <div className="space-y-1">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <FileText className="w-4 h-4 text-text-body" />
                          <span className="text-sm truncate">{file.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleSubmitForCheck}
                  disabled={selectedFiles.length === 0 || isUploading}
                  className="w-full bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end hover:opacity-90 transition-opacity duration-200"
                >
                  {isUploading ? 'Загружается...' : 'Отправить на проверку'}
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft-40 mt-6">
              <CardHeader>
                <CardTitle>Настройки проверки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="criteria">Критерии оценки</Label>
                  <Textarea
                    id="criteria"
                    placeholder="Укажите критерии для оценки работ..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxScore">Максимальный балл</Label>
                  <Input
                    id="maxScore"
                    type="number"
                    placeholder="5"
                    min="1"
                    max="10"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Homework list */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-h3 font-semibold">Список работ</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Все работы
                </Button>
                <Button variant="outline" size="sm">
                  Только непроверенные
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {mockHomeworks.map((homework) => (
                <Card key={homework.id} className="shadow-soft-40 hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{homework.studentName}</CardTitle>
                        <CardDescription className="text-text-body">
                          {homework.subject} • {homework.assignment}
                        </CardDescription>
                        <p className="text-sm text-text-body mt-1">
                          Сдано: {homework.submittedAt}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {homework.grade && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-primary">{homework.grade}</div>
                            <div className="text-xs text-text-body">оценка</div>
                          </div>
                        )}
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(homework.status)}`}>
                          {getStatusIcon(homework.status)}
                          {getStatusText(homework.status)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {homework.feedback && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-800 mb-1">Обратная связь ИИ:</p>
                            <p className="text-sm text-blue-700">{homework.feedback}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {homework.aiScore && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-text-body mb-1">
                          <span>Автоматическая оценка ИИ</span>
                          <span>{homework.aiScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end h-2 rounded-full transition-all duration-300"
                            style={{ width: `${homework.aiScore}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Просмотр
                      </Button>
                      {homework.status === 'checked' && (
                        <Button 
                          size="sm"
                          className="bg-gradient-to-r from-accent-start to-accent-end hover:opacity-90 transition-opacity duration-200 text-white"
                        >
                          Отправить ученику
                        </Button>
                      )}
                      {homework.status === 'pending' && (
                        <Button 
                          size="sm"
                          className="bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end hover:opacity-90 transition-opacity duration-200"
                        >
                          Проверить сейчас
                        </Button>
                      )}
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

export default HomeworkCheck;
