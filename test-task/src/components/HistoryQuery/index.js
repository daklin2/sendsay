import { connect } from 'react-redux';

import HistoryQuery from './HistoryQuery';
import { deleteQueriesHistory } from '../../redux/actions/creators/console.creators';

const mapStateToProps = () => ({});

const mapToDispatch = (dispatch) => ({
  deleteQuery: (index) => dispatch(deleteQueriesHistory(index)),
});

export default connect(mapStateToProps, mapToDispatch)(HistoryQuery);
