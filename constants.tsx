
import { Puppy, Parent, ScheduleEvent, NavLink, BlogPost } from './types';

export const BREEDER_CONTACT_EMAIL = 'tracyraye@icloud.com';
export const BREEDER_PHONE = '(214) 585-2519';

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/Pawsomepomskies',
  instagram: 'https://www.instagram.com/pawsomepomskies/',
  tiktok: 'https://www.tiktok.com/@pawsomepomskies?lang=en',
  reviews: 'https://www.google.com/search?q=Paw-some+Pomskies+&sca_esv=378965eda3ddb2bd&sxsrf=AE3TifOeNyYwbh2Ke9utvDjwNCfz7nRO4w%3A1766778807778&ei=t-dOafCgL_uzqtsPr5Xn-Qk&ved=0ahUKEwiw2O_5g9yRAxX7mWoFHa_KOZ8Q4dUDCBE&uact=5&oq=Paw-some+Pomskies+&gs_lp=Egxnd3Mtd2l6LXNlcnAiElBhdy1zb21lIFBvbXNraWVzIDIEECMYJzIIEAAYFhgKGB4yCBAAGIAEGKIEMggQABiABBiiBDIFEAAY7wVI5wZQ5ARY5ARwAngBkAEAmAFaoAFaqgEBMbgBA8gBAPgBAZgCA6ACbMICChAAGLADGNYEGEeYAwCIBgGQBgiSBwEzoAfpA7IHATG4B2HCBwMyLTPIBw2ACAA&sclient=gws-wiz-serp&lqi=ChFQYXctc29tZSBQb21za2llc0j3mpyvu7yAgAhaHxAAEAEQAhgAGAEYAiIRcGF3IHNvbWUgcG9tc2tpZXOSAQtkb2dfYnJlZWRlcpoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQyeE9kMXA2V2t4Uk1sSldURmQ0TkV4VVdsQlRWMUp6VG5wS1UwMHdSUkFC4AEA-gEFCOMBECs#lkt=LocalPoiReviews&rlimm=7512529245103108893',
  goodDog: 'https://www.gooddog.com/breeders/pawsome-pomskies-texas'
};

export const SITE_ASSETS = {
  branding: {
    logo: 'https://i.ibb.co/VWVhPqD/pawsome-texas-logo.png',
    goodDogBadge: 'https://images.gooddog.com/badges/breeder_badge_gold.png', 
  },
  sections: {
    heroBackground: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=2000',
    aboutMain: 'https://images.unsplash.com/photo-1593134257782-e89567b7718a?auto=format&fit=crop&q=80&w=1200',
  },
  emailConfig: {
    serviceId: '',
    templateId: '',
    publicKey: ''
  }
};

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Essential Grooming Tips for Your Fluffy Pomsky',
    excerpt: 'Maintain that beautiful double coat with our professional grooming guide for Pomsky owners.',
    author: 'Tracy Raye',
    content: [
      "The Pomsky is famous for its thick, double-layered coat that inherits qualities from both the Siberian Husky and the Pomeranian.",
      "First and foremost, never shave your Pomsky. Their double coat acts as insulation, keeping them warm in winter and cool in summer.",
      "We recommend a thorough brushing at least three times a week using a high-quality slicker brush and an undercoat rake."
    ],
    category: 'Health',
    date: 'Oct 24, 2024',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800'
  }
];

export const INITIAL_PUPPIES: Puppy[] = [
  {
    id: '1',
    name: 'Chicken',
    gender: 'Female',
    age: '8 Weeks',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1591769225440-811ad7d62ca2?auto=format&fit=crop&q=80&w=800',
    description: 'Blue eyed beauty with a playful personality.',
    coatColor: 'Silver & White',
    eyeColor: 'Ice Blue',
    weight: '4.2 lbs'
  }
];

export const INITIAL_PARENTS: Parent[] = [
  {
    id: 'p1',
    name: 'Arctic',
    role: 'Sire',
    breed: 'F1 Pomsky',
    weight: '18 lbs',
    image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=800',
    description: 'A magnificent blue-eyed sire with a perfect mask.'
  },
  {
    id: 'p2',
    name: 'Nova',
    role: 'Dam',
    breed: 'F2 Pomsky',
    weight: '14 lbs',
    image: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&q=80&w=800',
    description: 'A beautiful cream and white dam with a sweet personality.'
  }
];

export const INITIAL_SCHEDULE: ScheduleEvent[] = [
  {
    period: 'Spring 2025',
    event: 'Arctic x Nova Litter',
    date: 'March 15th',
    details: 'Expectation: 4-6 Puppies, Multi-color'
  },
  {
    period: 'Summer 2025',
    event: 'Blue x Bella Litter',
    date: 'July 2nd',
    details: 'Expectation: Husky-mask specialists'
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: 'LUA AND DON BRASIL',
    date: '2024',
    rating: 5,
    text: "Paw Some Pomskies is absolutely amazing! Tracy, the owner, and her family put their whole heart into raising these dogs, and their dedication is unmatched. You can truly see how much they love and care for every single pup as if they were part of their own family. Tracy goes above and beyond to make sure each puppy is not only healthy and happy, but also has the best possible future with their new family.",
    avatar: 'LB'
  },
  {
    id: 2,
    name: 'ALLY CAT',
    date: 'January 2025',
    rating: 5,
    text: "We brought home Riot (formerly Zack) in January 2025, and the experience with Tracy at Pawsome Pomskies could not have been better. She spent well over an hour on the phone answering all of my questions, was knowledgeable, and gave us an honest picture of Riot's projected size and temperament. Both dogs are thriving! Riot is our big, playful goofball, and Rebel is our sassy little shadow.",
    avatar: 'AC'
  },
  {
    id: 3,
    name: 'STEPHANE CROWDER',
    date: '2024',
    rating: 5,
    text: "Couldn't have gotten my baby from any nicer of a person. I was interested in getting a Pomsky from her, so she FaceTimed me and let me pick my baby out and then met me half way to pick her up. It didn't matter how late it was. Tracy takes very good care of her pomskies. She is a very trust worthy person. PLUS she sends you home with lots of goodies.",
    avatar: 'SC'
  },
  {
    id: 4,
    name: 'KATHY MCHUGH',
    date: '2024',
    rating: 5,
    text: "We adopted one of Tracy's retired girls. What a sweet, loving dog! And SO smart! All of Tracy's dogs we encountered in the process of adopting her were beautiful, healthy and well socialized and calm. Tracy and her daughter were a joy to deal with. We consider them friends now!",
    avatar: 'KM'
  },
  {
    id: 5,
    name: 'ANGIE HELM',
    date: '2023',
    rating: 5,
    text: "Paw-some Pomskies is there for you after you pick up your pup for any advise and wants to hear about the pups adventures throughout their lives. We now have 2 Pomskies from Paw-some Pomskies. She was very helpful and sent pictures of different pups to choose from along with videos.",
    avatar: 'AH'
  },
  {
    id: 6,
    name: 'LEXY HEDGECOCK',
    date: '2024',
    rating: 5,
    text: "We love our Wyld from Paw-Some Pomskies! He has been the best addition to our pack. Top tier communication, and was such an easy process. 10/10 would go back again for another!",
    avatar: 'LH'
  }
];

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Puppies', href: '#puppies' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Blogs', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];
