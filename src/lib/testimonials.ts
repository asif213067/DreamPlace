export type Testimonial = {
  name: string;
  location: string;
  quote: string;
  /** Star rating out of 5. */
  rating: 1 | 2 | 3 | 4 | 5;
  /** Optional portrait; a fallback avatar is rendered when missing or broken. */
  photo?: string;
};

/**
 * Dummy data — swap with API data by passing the fetched array as the
 * `testimonials` prop to <Testimonials />.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    rating: 5,
    photo: "/images/person1.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    rating: 4,
    photo: "/images/person2.png",
  },
  {
    quote:
      '"The Sahara Overnight Experience Was Beyond Imagination. Camels, Campfire Stories, And A Sky Full Of Stars. The Team Handled Every Detail Flawlessly."',
    name: "Amara Diallo",
    location: "Marrakech, Morocco",
    rating: 5,
    photo: "/images/people/portrait-1.jpg",
  },
  {
    quote:
      '"Our Tuscany Tour Was Seamless From Start To Finish. Knowledgeable Local Guides, Beautiful Countryside Stays, And Restaurants We Would Never Have Found Alone."',
    name: "James Whitfield",
    location: "Toronto, Canada",
    rating: 4,
    photo: "/images/people/portrait-2.jpg",
  },
  {
    quote:
      '"Kerala Backwaters Were Stunningly Beautiful. The Houseboat Booking And Every Local Experience Exceeded Everything We Hoped For. Truly Relaxing!"',
    name: "Priya Nair",
    location: "Mumbai, India",
    rating: 5,
    photo: "/images/people/portrait-3.jpg",
  },
  {
    quote:
      '"The Amazon River Journey Was Surreal. Expert Naturalists, Delicious Food, And Wildlife Sightings Our Family Will Talk About For Years. Worth Every Penny!"',
    name: "Lucas Andrade",
    location: "Rio de Janeiro, Brazil",
    rating: 5,
    photo: "/images/people/portrait-4.jpg",
  },
  {
    quote:
      '"Flawless Ten Days In Japan. Shinkansen Reservations, Hidden Kyoto Alleys, And Insider Dining Made It Feel Effortless. We Are Already Planning The Next Trip!"',
    name: "Emma Kowalski",
    location: "Warsaw, Poland",
    rating: 4,
    photo: "/images/people/portrait-5.jpg",
  },
];
