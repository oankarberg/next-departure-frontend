/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../components/Spinner/Spinner';
import { fetchDataSuccess } from '../redux/actions/simpleAction';

const GraphQLContext = React.createContext({});
const GraphQLProvider = GraphQLContext.Provider;
const GraphQLConsumer = GraphQLContext.Consumer;

const withGraphQL = WrappedComponent => {
    const EnhancedComp = props => (
        <GraphQLConsumer>
            {client => <WrappedComponent {...props} client={client} />}
        </GraphQLConsumer>
    );

    return EnhancedComp;
};
withGraphQL.propTypes = {
    client: PropTypes.element,
    data: PropTypes.objectOf(PropTypes.any)
};

const queryWrap = (WrappedComponent, query, staticVariables) => {
    class Query extends Component {
        constructor(props) {
            super(props);
            const { client, variables } = this.props;
            const watchQuery = client.watchQuery({
                query,
                variables: variables || staticVariables,
                notifyOnNetworkStatusChange: true
            });
            this.state = {
                watchQuery,
                variables: variables || staticVariables
            };
        }

        componentDidMount() {
            this._mounted = true;
            const { watchQuery } = this.state;
            watchQuery.subscribe(({ loading, data }) => {
                if (this._mounted) {
                    this.setState({ loading, data });
                }
            });
        }

        componentWillUnmount() {
            this._mounted = false;
        }

        render() {
            const { data } = this.state;
            return (
                <>
                    {data ? (
                        <WrappedComponent {...this.state} {...this.props} />
                    ) : (
                        <Spinner />
                    )}
                </>
            );
        }
    }
    return Query;
};

const queryWrapRedux = (WrappedComponent, query, staticVariables) => {
    class QueryRedux extends Component {
        constructor(props) {
            super(props);
            const { client, variables } = this.props;
            const watchQuery = client.watchQuery({
                query,
                variables: variables || staticVariables,
                notifyOnNetworkStatusChange: true
            });
            this.state = {
                watchQuery,
                data: false,
                variables: variables || staticVariables
            };
        }

        componentDidMount() {
            const { watchQuery } = this.state;
            this._subscription = watchQuery.subscribe(({ loading, data }) => {
                if (this._subscription) {
                    if (!loading) {
                        this.props.fetchDataSuccess(data);
                    }
                }
            });
        }

        componentWillUnmount() {
            this._subscription.unsubscribe();
            delete this._subscription;
        }

        render() {
            const { data } = this.props;
            return (
                <>
                    {data ? (
                        <WrappedComponent {...this.state} {...this.props} />
                    ) : (
                        <Spinner />
                    )}
                </>
            );
        }
    }
    return QueryRedux;
};

const mapDefaultStateToProps = state => ({
    ...state
});

const mapDefaultDispatchToProps = {
    fetchDataSuccess
};
const withQuery = (WrappedComponent, query, variables) =>
    withGraphQL(queryWrap(WrappedComponent, query, variables));

const withQueryRedux = (WrappedComponent, query, variables) =>
    withGraphQL(queryWrapRedux(WrappedComponent, query, variables));

const withRedux = (
    WrappedComponent,
    query,
    variables,
    mapStateToProps,
    mapDispatchToProps
) => {
    const allAndAll = withQueryRedux(WrappedComponent, query, variables);
    return connect(
        mapDefaultStateToProps,
        { ...mapDefaultDispatchToProps, ...mapDispatchToProps }
    )(allAndAll);
};

export { withRedux, withQuery, withGraphQL, GraphQLProvider };
