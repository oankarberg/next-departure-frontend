import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../components/Spinner/Spinner';

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

const withQuery = (WrappedComponent, query, variables) =>
    withGraphQL(queryWrap(WrappedComponent, query, variables));
export { withQuery, withGraphQL, GraphQLProvider };
