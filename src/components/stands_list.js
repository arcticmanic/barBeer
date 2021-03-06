import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStands } from '../actions/index';

class StandsList extends Component {
  componentWillMount() {
    this.props.fetchStands();
  }

  renderStands() {
    return this.props.stands.map((stand) => {
      let backImg;

      if (stand.backImg) {
        backImg = <img className="box__stand" src={require(`../images/stands/${stand.id}_2.png`)} />;
      }

      return (
        <div className="box" key={stand.id} >
          <div className={ backImg ? "box__inner box__inner_flip" : "box__inner" }>
            <figure className="box__image box__image_front">
              <img className="box__stand" src={require(`../images/stands/${stand.id}_1.png`)} />
            </figure>
            <figure className="box__image box__image_back">
              {backImg}
            </figure>

          </div>
        </div>
      );
    })
  };

  render() {
    if (this.props.stands.length === 0) {
      return(
        <div className="stands-list"></div>
      );
    }

    return (
      <div className='stands-list container__inner'>
        {this.renderStands()}
      </div>
    )
  }
};

function sortStands(type, mark, view, country, shape, turn, stands) {
  return stands
    .filter(stand => {
      return (
        (type == 'all' || type == stand.type) &&
        (mark == 'all' || mark == stand.mark) &&
        (view == 'all' || view == stand.view) &&
        (country == 'all' || country == stand.country) &&
        (shape == 'all' || shape == stand.shape) &&
        (turn == 'all' || turn == stand.turn)
      );
    });
};

function MapStateToProps(state) {

  if (!state.stands.items) {
    return {stands: []};
  }

  const { type, mark, view, country, shape, turn, items } = state.stands;
  return {
    stands: sortStands(type, mark, view, country, shape, turn, items)
  };
}


export default connect(MapStateToProps, { fetchStands })(StandsList);
