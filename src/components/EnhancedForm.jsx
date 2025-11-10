import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { CheckCircle2 } from 'lucide-react';

const EnhancedForm = ({ type = 'contact', onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getFormFields = () => {
    switch (type) {
      case 'investor':
        return [
          { name: 'fullName', label: 'Full Name', type: 'text', required: true, fullWidth: true },
          { name: 'email', label: 'Email Address', type: 'email', required: true },
          { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
          { name: 'company', label: 'Company Name', type: 'text' },
          { name: 'investmentRange', label: 'Investment Range', type: 'select', required: true, options: ['₹10-25 Lakhs', '₹25-50 Lakhs', '₹50 Lakhs - 1 Crore', '₹1 Crore+'] },
          { name: 'notes', label: 'Tell us about your investment interests', type: 'textarea', required: true, fullWidth: true }
        ];
      case 'casting':
        return [
          { name: 'name', label: 'Full Name', type: 'text', required: true, fullWidth: true },
          { name: 'email', label: 'Email Address', type: 'email', required: true },
          { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
          { name: 'role', label: 'Role/Department', type: 'select', required: true, options: ['Actor', 'Director of Photography', 'Editor', 'VFX Artist', 'Sound Engineer', 'Makeup Artist', 'Art Department', 'Assistant Director', 'Other'] },
          { name: 'portfolio', label: 'Portfolio/Showreel Link', type: 'url', required: true, fullWidth: true },
          { name: 'location', label: 'Current Location', type: 'text', required: true },
          { name: 'experience', label: 'Years of Experience', type: 'number', required: true },
          { name: 'notes', label: 'Tell us about your experience and why you want to join ProDyum', type: 'textarea', required: true, fullWidth: true }
        ];
      default:
        return [
          { name: 'name', label: 'Your Name', type: 'text', required: true, fullWidth: true },
          { name: 'email', label: 'Email Address', type: 'email', required: true },
          { name: 'phone', label: 'Phone Number', type: 'tel' },
          { name: 'topic', label: 'Subject', type: 'select', required: true, options: ['General Inquiry', 'Production Services', 'Investment Opportunities', 'Casting & Crew', 'Collaboration', 'Other'] },
          { name: 'message', label: 'Your Message', type: 'textarea', required: true, fullWidth: true }
        ];
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const fields = getFormFields();
    
    fields.forEach(field => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
      if (field.type === 'email' && formData[field.name] && !/\S+@\S+\.\S+/.test(formData[field.name])) {
        newErrors[field.name] = 'Please enter a valid email';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await onSubmit?.(formData);
        setFormData({});
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const renderField = (field) => {
    const hasValue = formData[field.name];
    const isFocused = focusedField === field.name;
    const hasError = errors[field.name];

    if (field.type === 'textarea') {
      return (
        <div key={field.name} className={`relative ${field.fullWidth ? 'col-span-2' : ''}`}>
          <div className="relative">
            <textarea
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              onFocus={() => setFocusedField(field.name)}
              onBlur={() => setFocusedField(null)}
              rows={5}
              className={`w-full px-6 py-4 pt-7 bg-black/50 border-2 rounded-lg text-white placeholder-transparent focus:outline-none transition-all duration-300 resize-none ${
                hasError ? 'border-red-500' : isFocused ? 'border-amber-500' : 'border-white/20 hover:border-white/30'
              }`}
              placeholder={field.label}
            />
            <label
              className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                hasValue || isFocused
                  ? 'top-2 text-xs text-amber-500'
                  : 'top-1/2 -translate-y-1/2 text-gray-400'
              }`}
            >
              {field.label} {field.required && <span className="text-amber-500">*</span>}
            </label>
          </div>
          {hasError && <p className="text-red-400 text-xs mt-1 ml-2">{hasError}</p>}
        </div>
      );
    }

    if (field.type === 'select') {
      return (
        <div key={field.name} className={`relative ${field.fullWidth ? 'col-span-2' : ''}`}>
          <div className="relative">
            <select
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              onFocus={() => setFocusedField(field.name)}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-6 py-4 pt-7 bg-black/50 border-2 rounded-lg text-white focus:outline-none transition-all duration-300 appearance-none cursor-pointer ${
                hasError ? 'border-red-500' : isFocused ? 'border-amber-500' : 'border-white/20 hover:border-white/30'
              }`}
            >
              <option value="" className="bg-neutral-900">Select an option</option>
              {field.options.map((option) => (
                <option key={option} value={option} className="bg-neutral-900">
                  {option}
                </option>
              ))}
            </select>
            <label
              className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                hasValue || isFocused
                  ? 'top-2 text-xs text-amber-500'
                  : 'top-1/2 -translate-y-1/2 text-gray-400'
              }`}
            >
              {field.label} {field.required && <span className="text-amber-500">*</span>}
            </label>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {hasError && <p className="text-red-400 text-xs mt-1 ml-2">{hasError}</p>}
        </div>
      );
    }

    return (
      <div key={field.name} className={`relative ${field.fullWidth ? 'col-span-2' : ''}`}>
        <div className="relative">
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            onFocus={() => setFocusedField(field.name)}
            onBlur={() => setFocusedField(null)}
            className={`w-full px-6 py-4 pt-7 bg-black/50 border-2 rounded-lg text-white placeholder-transparent focus:outline-none transition-all duration-300 ${
              hasError ? 'border-red-500' : isFocused ? 'border-amber-500' : 'border-white/20 hover:border-white/30'
            }`}
            placeholder={field.label}
          />
          <label
            className={`absolute left-6 transition-all duration-300 pointer-events-none ${
              hasValue || isFocused
                ? 'top-2 text-xs text-amber-500'
                : 'top-1/2 -translate-y-1/2 text-gray-400'
            }`}
          >
            {field.label} {field.required && <span className="text-amber-500">*</span>}
          </label>
        </div>
        {hasError && <p className="text-red-400 text-xs mt-1 ml-2">{hasError}</p>}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {getFormFields().map(renderField)}
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 font-semibold py-6 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/50 transform hover:scale-[1.02] group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isSubmitting ? (
          <>
            <span className="mr-2">Sending...</span>
            <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          </>
        ) : (
          <>
            <span className="mr-2">Submit {type === 'investor' ? 'Interest' : type === 'casting' ? 'Application' : 'Message'}</span>
            <CheckCircle2 className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
          </>
        )}
      </Button>
    </form>
  );
};

export default EnhancedForm;