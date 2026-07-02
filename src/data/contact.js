export const CONTACT = {
  email: 'widespread2121@gmail.com',
  phone: '+91 8373909026',
  phoneRaw: '918373909026',
  locationLabel: 'Samaspur, Sector 51, Gurugram',
  locationFull: 'Ground Floor, 37, Village Samaspur, Sector 51, Gurugram, Haryana 122003',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Ground+Floor+37+Village+Samaspur+Sector+51+Gurugram+Haryana',
}

// Web3Forms access key — emails every contact-form submission to you.
// Get a free key in ~1 min: go to https://web3forms.com, enter the email that
// should RECEIVE inquiries, and paste the key it sends you below.
// Until a real key is set, the form still works but only saves locally.
export const WEB3FORMS_ACCESS_KEY = 'bfb0685e-9a78-423f-ac7b-c8da1c537c33'

// EmailJS — sends an automatic confirmation email to the CUSTOMER after they
// submit the form (a thank-you + a copy of what they filled in). Free tier.
//
// One-time setup (~5 min):
//   1. Create a free account at https://www.emailjs.com
//   2. Email Services → add a service (connect Gmail, etc.) → copy the Service ID
//   3. Email Templates → create a template whose "To Email" is  {{email}}  and
//      whose body uses {{name}}, {{phone}}, {{city}}, {{type}}, {{message}}
//      (a ready-to-paste template is in the note above sendConfirmation() in
//      ConnectForm.jsx) → copy the Template ID
//   4. Account → General/API Keys → copy the Public Key
//   5. Account → Security → add your site's domain to "Allowed Origins"
//   6. Paste the three values below.
// Until all three are set, the customer confirmation is skipped (the owner
// notification via Web3Forms is unaffected).
export const EMAILJS = {
  serviceId: 'service_l1s0v1l',
  templateId: 'template_rpwmjf8',
  publicKey: 'l97kUTm2qpkpA0Wfq',
}

