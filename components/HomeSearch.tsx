'use client';

import SearchBar from '@/components/SearchBar';

export default function HomeSearch() {
  // This function is created on the client, so it's allowed
  return <SearchBar onResults={() => {}} />;
}
