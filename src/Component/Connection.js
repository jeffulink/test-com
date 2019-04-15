import React, { Component } from 'react';
import Navbar from "../Container/Navbar";
import { Button, Table, Label, } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { fetchDatabaseData, storeDatabaseData, getBlockchainDBData } from '../store/action'
class ConnectionDB extends Component {


    fetchData = () => {
        console.log('jhjhjshjh')
        this.props.getDataBaseData();
    }
    storeData = () => {
        if (this.props.dataBaseData !== null) {
            this.props.storeDbData(this.props.dataBaseData);
        } else {
            console.log('no data to submit')
        }
    }
    getBlockchainData = () => {
        this.props.getBData()
    }
    render() {
        return (
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ width: '25%', backgroundColor: 'blue' }}>
                    <Navbar history={this.props.history} />
                </div>
                <div
                    style={{ width: "75%", marginTop: 70, paddingBottom: 80 }}
                >
                    <Button positive onClick={this.fetchData}>Get MS SQL Data</Button>
                    {
                        this.props.dataBaseData !== null ?
                            this.props.dataBaseData.sqlData.recordset.map((item, index) =>
                                <Table celled key={index}>
                                    <Table.Body>
                                        <Table.Row>

                                            <Table.Cell>{item.PersonID}</Table.Cell>

                                            <Table.Cell>{item.FirstName}</Table.Cell>
                                            <Table.Cell>{item.LastName}</Table.Cell>
                                            <Table.Cell>{item.City}</Table.Cell>
                                            <Table.Cell>{item.Address}</Table.Cell>
                                        </Table.Row>

                                    </Table.Body>
                                </Table>
                            )
                            : null
                    }
                    <Button positive onClick={this.storeData}>Push Data To Blockchain</Button>
                    <Button positive onClick={this.getBlockchainData}>Get Blockchain Data</Button>
                    {
                        this.props.bockchainData !== null ?
                            this.props.bockchainData.map((item, index) =>
                                <Table celled key={index}>
                                  <Table.Body>
                                         <Table.Row>

                                             <Table.Cell>{item.firstName}</Table.Cell>

                                             <Table.Cell>{item.lastName}</Table.Cell>
                                            <Table.Cell>{item.address}</Table.Cell>
                                             <Table.Cell>{item.city}</Table.Cell>
                                         </Table.Row>

                                     </Table.Body>
                                </Table>
                            )
                            : null
                    }

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        dataBaseData: state.reducer.databaseData,
        bockchainData: state.reducer.blockchainData
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getDataBaseData: () => dispatch(fetchDatabaseData()),
        storeDbData: (data) => dispatch(storeDatabaseData(data)),
        getBData: () => dispatch(getBlockchainDBData())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConnectionDB);

