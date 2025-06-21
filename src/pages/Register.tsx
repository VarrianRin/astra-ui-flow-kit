
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return 'weak';
    if (password.length < 10 && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return 'medium';
    return 'strong';
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="min-h-screen flex">
      {/* Left column - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 to-accent/20 items-center justify-center p-12">
        <div className="text-center">
          <div className="w-80 h-80 bg-primary/20 rounded-full flex items-center justify-center mb-8">
            <div className="text-6xl">👩‍🏫</div>
          </div>
          <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
            Присоединяйтесь к Astra ИИ
          </h3>
          <p className="text-muted-foreground max-w-md">
            Начните экономить время уже сегодня
          </p>
        </div>
      </div>

      {/* Right column - Register form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:max-w-md lg:mx-auto">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center">
            <h2 className="text-h2 font-bold text-neutral-900 mb-2">
              Создать аккаунт учителя
            </h2>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="teacher@school.ru"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {password && (
                <div className="flex items-center space-x-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all ${
                        passwordStrength === 'weak' ? 'w-1/3 bg-red-500' :
                        passwordStrength === 'medium' ? 'w-2/3 bg-yellow-500' :
                        'w-full bg-green-500'
                      }`}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground capitalize">
                    {passwordStrength === 'weak' ? 'Слабый' :
                     passwordStrength === 'medium' ? 'Средний' : 'Сильный'}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button className="w-full">
              Создать аккаунт
            </Button>
          </form>

          {/* OAuth buttons */}
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full border-red-200 text-red-700 hover:bg-red-50"
            >
              Войти через Яндекс
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              Госуслуги
            </Button>
          </div>

          <div className="text-center">
            <Link 
              to="/auth/login" 
              className="text-primary hover:underline"
            >
              Уже есть аккаунт? Войдите
            </Link>
          </div>

          <div className="bg-accent p-4 rounded-lg text-center">
            <Link 
              to="/students/login"
              className="font-semibold text-neutral-900 hover:text-primary"
            >
              ДЛЯ УЧЕНИКОВ ВХОД ЗДЕСЬ
            </Link>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Регистрируясь, вы соглашаетесь на обработку персональных данных
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
