import {useState, useEffect} from 'react';

import Modal from '../Modal';
import Input from '../Input';
import Button from '../Button';
import Select from '../Select';
import {STATUS_OPTIONS, SOURCE_OPTIONS, CATEGORY_OPTIONS} from '@constants';
import type {
  Contact,
  ContactStatus,
  ContactSource,
  ContactCategory,
} from '@types';

interface EditContactModalProps {
  isOpen: boolean;
  markets: string[];
  isSaving: boolean;
  onClose: () => void;
  contact: Contact | null;
  onSave: (id: string, data: Partial<Contact>) => Promise<void>;
}

export default function EditContactModal({
  isOpen,
  contact,
  markets,
  onClose,
  onSave,
  isSaving,
}: EditContactModalProps) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    market: '',
    status: '' as ContactStatus,
    source: '' as ContactSource,
    category: '' as ContactCategory,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (contact) {
      setFormData({
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone_number: contact.phone_number,
        market: contact.market,
        status: contact.status,
        source: contact.source,
        category: contact.category,
      });
      setErrors({});
    }
  }, [contact]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: ''}));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contact || !validateForm()) {
      return;
    }

    try {
      await onSave(contact.id, formData);
      onClose();
    } catch (error) {
      console.error('Failed to update contact:', error);
    }
  };

  const marketOptions = markets.map(market => ({
    value: market,
    label: market,
  }));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Contact" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="First Name"
            value={formData.first_name}
            onChange={e => handleChange('first_name', e.target.value)}
            placeholder="Enter first name"
          />

          <Input
            label="Last Name"
            value={formData.last_name}
            onChange={e => handleChange('last_name', e.target.value)}
            placeholder="Enter last name"
          />
        </div>

        <Input
          label="Email *"
          type="email"
          value={formData.email}
          onChange={e => handleChange('email', e.target.value)}
          placeholder="Enter email"
          error={errors.email}
          required
        />

        <Input
          label="Phone Number"
          value={formData.phone_number}
          onChange={e => handleChange('phone_number', e.target.value)}
          placeholder="Enter phone number"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Status"
            value={formData.status}
            onChange={e =>
              handleChange('status', e.target.value as ContactStatus)
            }
            options={STATUS_OPTIONS.map(opt => ({
              value: opt.value,
              label: opt.label,
            }))}
          />

          <Select
            label="Source"
            value={formData.source}
            onChange={e =>
              handleChange('source', e.target.value as ContactSource)
            }
            options={SOURCE_OPTIONS.map(opt => ({
              value: opt.value,
              label: opt.label,
            }))}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Category"
            value={formData.category}
            onChange={e =>
              handleChange('category', e.target.value as ContactCategory)
            }
            options={CATEGORY_OPTIONS.map(opt => ({
              value: opt.value,
              label: opt.label,
            }))}
          />

          <Select
            label="Market"
            value={formData.market}
            onChange={e => handleChange('market', e.target.value)}
            options={marketOptions}
          />
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSaving}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
