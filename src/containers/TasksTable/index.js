import React, { Component } from 'react';
import TaskCreatorForm from "../../components/TaskCreatorForm";
import {connect} from "react-redux";
import {ACTIONS} from "../../redux";
import {Table, Pagination, PaginationItem, PaginationLink} from "reactstrap";


class ReactTableComponent extends Component {
    state = {
        editableTaskId: null
    }

   componentDidMount() {
       this.props.getTasks()
   }

   renderPagination(){
       return (
           <Pagination style={{marginLeft: 50}}>
               <PaginationItem>
                   <PaginationLink previous href="#" />
               </PaginationItem>
               <PaginationItem active={true}>
                   <PaginationLink href="#">
                       1
                   </PaginationLink>
               </PaginationItem>
               <PaginationItem>
                   <PaginationLink href="#">
                       2
                   </PaginationLink>
               </PaginationItem>
               <PaginationItem>
                   <PaginationLink href="#">
                       3
                   </PaginationLink>
               </PaginationItem>
               <PaginationItem>
                   <PaginationLink href="#">
                       4
                   </PaginationLink>
               </PaginationItem>
               <PaginationItem>
                   <PaginationLink href="#">
                       5
                   </PaginationLink>
               </PaginationItem>
               <PaginationItem>
                   <PaginationLink next href="#" />
               </PaginationItem>
           </Pagination>
       )
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
       if (this.props.postAdded){
           this.props.getTasks()
       }
   }

   handleEdit(task){
        if(this.state.editableTaskId){
             this.props.editTask({...task, newValue: this.state.editedValue});
             this.setState({editableTaskId: null});
             return
        }
       this.setState({editableTaskId: task._id})
   }

    render() {
      const {tasks, isLoggedIn} = this.props;
      const {editableTaskId} = this.state;
        return (
            <div className="row">
                <div className="col">
                    <TaskCreatorForm onPostTask={this.props.postTask}/>
                    <div style={{ padding: '50px' }}>
                        <Table>
                            <thead>
                            <tr>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Text</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                tasks.map(task => (
                                    <tr key={task._id}>
                                        <th scope="row">{task.email}</th>
                                        <td>{task.username}</td>
                                        <td>{editableTaskId === task._id ? <input  onChange={({target}) => this.setState({editedValue: target.value})}/> : task.text}</td>
                                        <td>{!task.status ? "выполнено" : "Oтредактировано администратором"}</td>
                                        {isLoggedIn &&
                                        <td
                                            onClick={() => this.handleEdit(task)}
                                            className={"pointer"}
                                        >{editableTaskId === task._id ? "Save": "Edit"}</td>}
                                    </tr>
                                ))
                            }
                            </tbody>
                        </Table>
                    </div>
                    {this.renderPagination()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
        tasks: state.tasks ? state.tasks[0].tasks : [],
        isLoggedIn: state.isLoggedIn
});

const mapDispatchToProps = (dispatch) => ({
    postTask: (data) => dispatch(ACTIONS.attemptPostTask(data)),
    getTasks: () => dispatch(ACTIONS.attemptGetTasks()),
    editTask: (data) => dispatch(ACTIONS.attemptEditTask(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReactTableComponent);
