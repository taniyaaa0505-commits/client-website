import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'
import ConnectForm from '../components/ConnectForm'

export default function Contact() {
  const [searchParams] = useSearchParams()
  const preselectedBrand = searchParams.get('brand') || ''

  return (
    <div className="pt-16">
      <section className="bg-stone-50 border-b border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <p className="section-label mb-3">Contact</p>
          <h1 className="font-display text-5xl font-light text-stone-900">Get in touch</h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2 space-y-4">
              {[
                { icon: <Mail size={15} />, value: 'info@widespreaddistribution.com' },
                { icon: <Phone size={15} />, value: '+91 8373909026' },
                { icon: <MapPin size={15} />, value: 'New Delhi, India' },
              ].map(item => (
                <div key={item.value} className="flex items-center gap-3 text-sm text-stone-600 font-body">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-stone-500">
                    {item.icon}
                  </div>
                  {item.value}
                </div>
              ))}
            </div>

            <div className="lg:col-span-3">
              <ConnectForm preselectedBrand={preselectedBrand} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
