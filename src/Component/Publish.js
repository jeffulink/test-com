import React, { Component } from 'react';
import NavBar from '../Container/Navbar'
import { Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { pageList,pageDetail } from '../store/action'
import {Link} from 'react-router-dom'
class Publish extends Component {




    componentWillMount() {
        this.props.pagesListCo()
    }
    pickRow = (id) => {
        // console.log(id)
        this.props.pagesDetail(id)
    }
    render() {
        let userId = JSON.parse(localStorage.getItem('userInfo'));
        return (
            <div style={{ display: 'flex' }}>
                <div style={{ width: '25%', backgroundColor: 'blue' }}>
                    <NavBar history={this.props.history} />
                </div>
                <div
                    style={{ width: "75%", marginTop: 20, paddingBottom: 60 }}
                >
                    <div style={{ width: "80%", margin: "0px auto" }}>
                        <Table celled padded>
                            <Table.Header>
                                <Table.Row >
                                    <Table.HeaderCell>Heading</Table.HeaderCell>
                                    <Table.HeaderCell>Paragraph</Table.HeaderCell>


                                </Table.Row>
                            </Table.Header>
                            {

                                this.props.listcreatePages !== null ?

                                    this.props.listcreatePages.map((value, index) => {
                                        return (
                                            value.userId === userId.uid ?
                                            <Table.Body key={index}>
                                                <Table.Row onClick={() => this.pickRow(value.id)}>
                                                    <Table.Cell singleLine>
                                                <Link to={`/publishpage/${value.id}`}>
                                                    
                                                    {value.name}
                                                    </Link>
                                                    
                                                    </Table.Cell>
                                                 
                                                    <Table.Cell singleLine>
                                                    
                                                    {value.paragraph}
                                                    
                                                    </Table.Cell>

                                                </Table.Row>
                                               
                                            </Table.Body>
                                            :null
                                        );
                                    })
                                    : null

                            }
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        listcreatePages: state.reducer.publishList
    }
}
function mapDispatchToProps(dispatch) {
    return {
        pagesListCo: () => {
            dispatch(pageList())
        },
        pagesDetail:(id)=>{
            dispatch(pageDetail(id))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Publish);