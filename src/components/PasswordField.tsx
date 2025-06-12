import React, { useState } from 'react';
import { Input, InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordFieldProps extends Omit<InputProps, 'type'> {
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
  error?: string; // For displaying validation errors
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  id,
  name,
  containerClassName = 'space-y-1',
  labelClassName,
  error,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const uniqueId = id || name || 'password-field'; // Ensure there's an id for label association

  console.log("Rendering PasswordField for:", name || id);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    console.log("Password visibility toggled for:", name || id, !showPassword);
  };

  return (
    <div className={containerClassName}>
      {label && (
        <Label htmlFor={uniqueId} className={labelClassName}>
          {label}
        </Label>
      )}
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          id={uniqueId}
          name={name}
          {...props}
          className={`pr-10 ${props.className || ''} ${error ? 'border-red-500' : ''}`}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default PasswordField;