import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from '../config-global';

import { RoomsView } from '../sections/rooms/view';
import RoomModal from '../sections/rooms/rooms-modal';

// ----------------------------------------------------------------------

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Helmet>
        <title> {`Rooms - ${CONFIG.appName}`}</title>
      </Helmet>

      <RoomsView handleModal={handleModal} />
      <RoomModal isOpen={isOpen} handleModal={handleModal} />
    </>
  );
}
