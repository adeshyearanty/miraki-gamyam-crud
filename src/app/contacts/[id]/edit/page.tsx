'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ContactForm from '@/components/ContactForm';
import { IContact } from '@/models/Contact';

export default function EditContact() {
  const params = useParams();
  const [contact, setContact] = useState<IContact | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchContact();
  }, [params.id]);

  const fetchContact = async () => {
    try {
      const response = await fetch(`/api/contacts/${params.id}`);
      if (!response.ok) throw new Error('Contact not found');
      const data = await response.json();
      setContact(data);
    } catch (error) {
      console.error('Failed to fetch contact:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Contact not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Edit Contact</h1>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <ContactForm mode="edit" initialData={contact} />
          </div>
        </div>
      </div>
    </div>
  );
}