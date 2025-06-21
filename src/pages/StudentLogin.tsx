
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const StudentLogin = () => {
  const [login, setLogin] = useState('');
  const [roomCode, setRoomCode] = useState('');

  return (
    <div className="min-h-screen flex">
      {/* Left column - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 to-accent/20 items-center justify-center p-12">
        <div className="text-center">
          <div className="w-80 h-80 bg-accent/30 rounded-full flex items-center justify-center mb-8">
            <div className="text-6xl">🎓</div>
          </div>
          <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
            Добро пожаловать, ученик!
          </h3>
          <p className="text-muted-foreground max-w-md">
            Введите данные, которые дал вам учитель
          </p>
        </div>
      </div>

      {/* Right column - Student login form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:max-w-md lg:mx-auto">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h2 className="text-h2 font-bold text-neutral-900 mb-2">
              Вход для учеников
            </h2>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login">Логин</Label>
              <Input
                id="login"
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Ваш логин"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roomCode">Код комнаты</Label>
              <Input
                id="roomCode"
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                placeholder="Введите код"
              />
              <p className="text-sm text-muted-foreground">
                Код комнаты выдаёт ваш учитель
              </p>
            </div>

            <Button className="w-full">
              Войти
            </Button>
          </form>

          <div className="text-center pt-4 border-t">
            <Link 
              to="/auth/login" 
              className="text-primary hover:underline"
            >
              Я учитель
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
