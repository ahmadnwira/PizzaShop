import React from 'react';

import { connect } from 'react-redux';

import ItemsList from '../components/items/ItemsList';

const Items = props => {
    return(
        <ItemsList
            items={props.items}
            active={props.active}
        />
    );
}

const mapStateToProps = state => ({items: state.activeCategoryItems.items})

export default connect(mapStateToProps)(Items);
