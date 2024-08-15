import './globals.css';
import MainHeader from '@/components/main-header/main-header';

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
  keywords: 'food, recipes, community, cooking, meals, healthy eating',
  author: 'NextLevel Food Team',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  robots: 'index, follow',
  language: 'en-US',
  charset: 'UTF-8',
  themeColor: '#ff6600',
  openGraph: {
    type: 'website',
    url: 'https://www.nextlevelfood.com',
    title: 'NextLevel Food',
    description: 'Delicious meals, shared by a food-loving community.',
    images: [
      {
        url: 'https://www.nextlevelfood.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NextLevel Food',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@NextLevelFood',
    creator: '@NextLevelFood',
    title: 'NextLevel Food',
    description: 'Delicious meals, shared by a food-loving community.',
    image: 'https://www.nextlevelfood.com/images/twitter-image.jpg',
  },
  favicon: '/favicon.ico',
  manifest: '/site.webmanifest',
  appleTouchIcon: '/apple-touch-icon.png',
  msapplicationTileColor: '#da532c',
  msapplicationTileImage: '/mstile-144x144.png',
  ogImage: '/images/og-image.jpg',
  twitterImage: '/images/twitter-image.jpg',
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MainHeader />    
        {children}
      </body>
    </html>
  );
}
