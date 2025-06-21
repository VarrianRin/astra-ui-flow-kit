
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Play, Clock, FileText, Star } from 'lucide-react';

const Dashboard = () => {
  const sessions = [
    {
      date: '15.06.2024',
      tool: 'План урока',
      status: 'Завершён',
      rating: 5,
    },
    {
      date: '14.06.2024',
      tool: 'Подбор заданий',
      status: 'Завершён',
      rating: 4,
    },
    {
      date: '13.06.2024',
      tool: 'Проверка работ',
      status: 'В процессе',
      rating: null,
    },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-6 py-8">
        {sessions.length > 0 ? (
          <div className="space-y-8">
            {/* Onboarding video */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Добро пожаловать в Astra ИИ!</h2>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-gray-600">Обучающее видео</p>
                  <p className="text-sm text-gray-500">Как использовать платформу</p>
                </div>
              </div>
            </div>

            {/* Session history */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">История сеансов</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Дата
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Инструмент
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Статус
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Оценка
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sessions.map((session, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {session.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {session.tool}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            session.status === 'Завершён' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {session.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {session.rating ? (
                            <div className="flex items-center">
                              {Array.from({ length: session.rating }).map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          // Empty state
          <div className="text-center py-16">
            <div className="w-64 h-64 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <FileText className="w-24 h-24 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Добро пожаловать в Astra ИИ!
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Начните использовать инструменты для создания планов уроков, подбора заданий и проверки работ
            </p>
            <Button asChild>
              <a href="/lesson-plan">Начните с плана урока</a>
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
