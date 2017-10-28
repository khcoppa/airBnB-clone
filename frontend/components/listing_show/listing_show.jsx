import React from 'react';
import { Link } from 'react-router-dom';

import ListingDetails from './listing_details';

class ListingShow extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    if (!this.props.listing) {
      this.props.fetchListing(this.props.listingId);
    }
  }
  render() {
    debugger
    if (this.props.listing) {
      return(
        <div id="listing-show-page">
          <div className="listing-img">
            <img src={this.props.listing.image_url} />
          </div>
          <ListingDetails
            listing={this.props.listing}
            listingId={this.props.listingId}
            fetchListing={this.props.fetchListing}
          />
          <BookingForm
            listingId={this.props.listing.id}
            bookerId={this.state.currentUser.id}
          />
        </div>
      );
    } else {
      return(<p>Loading...</p>);
    }
  }
}

export default ListingShow;
