'use client';

import { useState, useEffect } from 'react';
import { IContact } from '@/models/Contact';
import { useParams, useRouter } from 'next/navigation';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function ContactDetail() {
  const params = useParams();
  const router = useRouter();
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

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this contact?')) return;

    try {
      const response = await fetch(`/api/contacts?id=${params.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete contact');
      router.push('/');
    } catch (error) {
      console.error('Error deleting contact:', error);
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {contact.firstName} {contact.lastName}
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => router.push(`/contacts/${params.id}/edit`)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <PencilIcon className="h-5 w-5" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <TrashIcon className="h-5 w-5" />
                Delete
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email</label>
                    <div className="mt-1 text-sm text-gray-900">{contact.email}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Phone</label>
                    <div className="mt-1 text-sm text-gray-900">{contact.phone}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Company</label>
                    <div className="mt-1 text-sm text-gray-900">{contact.company || '-'}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Job Title</label>
                    <div className="mt-1 text-sm text-gray-900">{contact.jobTitle || '-'}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Status</label>
                    <div className="mt-1">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {contact.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Street</label>
                    <div className="mt-1 text-sm text-gray-900">{contact.address.street}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">City</label>
                    <div className="mt-1 text-sm text-gray-900">{contact.address.city}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">State</label>
                    <div className="mt-1 text-sm text-gray-900">{contact.address.state}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Country</label>
                    <div className="mt-1 text-sm text-gray-900">{contact.address.country}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Zip Code</label>
                    <div className="mt-1 text-sm text-gray-900">{contact.address.zipCode}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {contact.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-sm rounded-full bg-gray-100 text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Social Media</h3>
                  <div className="space-y-2">
                    {contact.socialMedia?.linkedin && (
                      <a
                        href={contact.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:text-indigo-900"
                      >
                        LinkedIn Profile
                      </a>
                    )}
                    {contact.socialMedia?.twitter && (
                      <a
                        href={contact.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:text-indigo-900 block"
                      >
                        Twitter Profile
                      </a>
                    )}
                    {contact.socialMedia?.facebook && (
                      <a
                        href={contact.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:text-indigo-900 block"
                      >
                        Facebook Profile
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {contact.notes && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Notes</h3>
                  <div className="text-sm text-gray-600 whitespace-pre-wrap">{contact.notes}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}