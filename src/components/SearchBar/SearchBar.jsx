import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import './SearchBar.css';
import { propType } from 'graphql-anywhere';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.state = {
            className: '',
            value: ''
        };
    }

    onInputChange(e) {
        const { onChange } = this.props;
        this.setState({ value: e.target.value }, () =>
            onChange(this.state.value)
        );
    }

    render() {
        const { className, value } = this.state;
        return (
            <div className="bus-stop-wrapper">
                <label className={`search ${className}`} htmlFor="inpt_search">
                    <input
                        id="inpt_search"
                        onFocus={() => {
                            this.setState({ className: 'active' });
                        }}
                        onBlur={() => {
                            if (value === '') this.setState({ className: '' });
                        }}
                        type="text"
                        onChange={this.onInputChange}
                    />
                </label>
            </div>
        );
    }
}

SearchBar.propTypes = {
    onChange: PropTypes.func
};

SearchBar.defaultProps = {
    onChange: () => {}
};

export default SearchBar;
