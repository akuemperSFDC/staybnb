import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect, useParams } from 'react-router-dom';
import { getListingByListingId } from '../../store/listing';

const ProtectedEditListingRoute = (props) => {
  const dispatch = useDispatch();
  const { listingId } = props.computedMatch.params;

  const user = useSelector((state) => state.session.user);
  const listingUser = useSelector((state) => state.listing.Listing_User);
  const [verifiedListingOwner, setVerifiedListingOwner] = useState(true);

  useEffect(
    () => dispatch(getListingByListingId(listingId)),
    [dispatch, listingId]
  );

  useEffect(() => {
    if (listingUser) {
      if (Number(listingUser.id) !== Number(user.id)) {
        setVerifiedListingOwner(false);
      }
    }
  }, [listingUser, user.id, verifiedListingOwner]);

  return (
    <Route {...props}>
      {user ? (
        verifiedListingOwner ? (
          props.children
        ) : (
          <Redirect to='/listings' />
        )
      ) : (
        <Redirect to='/splash' />
      )}
    </Route>
  );
};

export default ProtectedEditListingRoute;
