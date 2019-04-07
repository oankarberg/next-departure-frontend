import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

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
        this.setState({ value: e.target.value }, lol => {
            const { value } = this.state;
            onChange(value);
        });
    }

    render() {
        const { className, value } = this.state;
        return (
            <div className="bus-stop-wrapper">
                <label className={`search ${className}`} htmlFor="inpt_search">
                    <input
                        id="inpt_search"
                        autoComplete="off"
                        onFocus={() => {
                            this.setState({ className: 'active' });
                        }}
                        onBlur={() => {
                            if (value === '') this.setState({ className: '' });
                        }}
                        type="text"
                        placeholder="Sök hållplats"
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
