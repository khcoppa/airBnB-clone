import React from 'react';
import { Link } from 'react-router-dom';
import ListingMap from '../listing_map/listing_map';
import ReviewShow from './review_show';

const reviewList = (reviews = []) => (
  reviews.map(review => (
    <ReviewShow
      key={review.id}
      rating={review.rating}
      body={review.body}
      user={review.user}
    />
  ))
);

const averageRating = (reviews = []) => {
  let ratings = 0;
  let count = 0;
  reviews.forEach(review => {
    ratings += review.rating;
    count += 1;
  });
  let average = (ratings/count);
  return average;
};

class ListingDetails extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    if (!this.props.listing) {
      this.props.fetchListing(this.props.listingId);
    }
  }

  render() {
    const listingArr = [this.props.listing];
    const stars = [];
    for (let i=0; i < averageRating(this.props.listing.reviews); i++) {
      stars.push(<i className="fa fa-star"></i>);
    }
    if (this.props.listing) {

      return (
        <div className="listing-information">
          <div className="anchors">
            <ul>
              <li><a href="#overview">Overview</a></li>
              <li><a href="#reviews">Reviews</a></li>
              <li><a href="#location">Location</a></li>
            </ul>
          </div>

          <div className="overview">
            <a name="overview"></a>
            <h1>{this.props.listing.title}</h1>
            <p>{this.props.listing.location}</p>
            <ul>
              <li><i className="fa fa-users"></i> {this.props.listing.guests} guests</li>
              <li><i className="fa fa-bold"></i> {this.props.listing.bedrooms} bedrooms</li>
              <li><i className="fa fa-bed"></i> {this.props.listing.beds} beds</li>
              <li><i className="fa fa-bath"></i> {this.props.listing.bath} baths</li>
            </ul>
          </div>

          <div className="reviews">
            <a name="reviews"></a>
            <h2>{this.props.listing.reviews.length} Reviews {stars}</h2>
            {reviewList(this.props.listing.reviews)}
          </div>

          <a name="location"></a>
          <ListingMap
            listings={listingArr}
            updateFilter={this.props.updateFilter}
            singleListing={true}
          />
        </div>
      );
    } else {
      return(
        <div> loading </div>
      );
    }
  }
}

export default ListingDetails;
