// These site settings are overridden by site settings from the database
// database settings take priority over these settings

module.exports.sitesettings = {
  author: 'Hayk Saakian',
  website_title: 'Hayk Saakian',
  domain: 'hayksaakian.com',
  logo_url: '/images/logo.jpeg',

  show_contact_email: true,  
  contact_email: 'first.last@gmail.com',

  show_phone_number: true,
  phone_number: '883-7226',

  base_page_title: 'Hayk Saakian - Entrepreneur and Software Developer',

  blog_tagline: 'Business, Code, and Problem Solving',

  social_sidebar: [
    {
      platform: 'twitter',
      link: 'http://twitter.com/hayksaakian',
      display_name: '@hayksaakian'
    }
  ],

  google_plus_id: '+HaykSaakian',

  google_analytics_ua: 'UA-50649528-1',

  hello_bar_enabled: true,
  hello_bar_id: '5a22a6b401deb2bb94e4327e86dc92a610438938'
}