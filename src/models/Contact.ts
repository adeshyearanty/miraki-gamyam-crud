export interface IContact {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  jobTitle?: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  tags: string[];
  notes?: string;
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  status: 'active' | 'inactive' | 'lead' | 'customer';
  lastContactDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export const ContactFields = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String },
  jobTitle: { type: String },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true }
  },
  tags: [{ type: String }],
  notes: { type: String },
  socialMedia: {
    linkedin: { type: String },
    twitter: { type: String },
    facebook: { type: String }
  },
  status: { 
    type: String, 
    enum: ['active', 'inactive', 'lead', 'customer'],
    default: 'active'
  },
  lastContactDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
};