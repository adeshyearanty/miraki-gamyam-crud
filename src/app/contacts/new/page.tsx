'use client';

import ContactForm from '@/components/ContactForm';

export default function NewContact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">New Contact</h1>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <ContactForm mode="create" />
          </div>
        </div>
      </div>
    </div>
  );
}