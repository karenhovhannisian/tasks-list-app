import React, { Component } from 'react';
import TaskCreatorForm from "../../components/TaskCreatorForm";
import {connect} from "react-redux";
import {ACTIONS} from "../../redux";
import {Table, Pagination, PaginationItem, PaginationLink} from "reactstrap";


class ReactTableComponent extends Component {
    state = {
        editableTaskId: null,
        sortByField: "createdAt",
        sortDirection: "asc",
        currentPage: 1
    }

   componentDidMount() {
       this.props.getTasks(this.state.sortByField)
   }

    getElementsForPage(currentPage){
        const {sortByField, sortDirection } = this.state;
        this.setState({currentPage});
        this.props.getTasks({sortByField, sortDirection, currentPage})
    }

   renderPagination(count){
        const pages = [];
           for (var i = 1; i < count / 3 + 1; i++) {
               pages.push(i)
           }
       return (
           <Pagination style={{marginLeft: 50}}>
               <PaginationItem
                   disabled={this.state.currentPage === 1}
                   onClick={() => this.state.currentPage !== 1 && this.getElementsForPage(--this.state.currentPage)}
               >
                   <PaginationLink previous href="#" />
               </PaginationItem>
               {
                   pages.map(page => (
                       <PaginationItem
                           active={this.state.currentPage === page}
                           onClick={() => this.getElementsForPage(page)}>
                           <PaginationLink href="#">
                               {page}
                           </PaginationLink>
                       </PaginationItem>
                   ))
               }
               <PaginationItem
                   disabled={this.state.currentPage === pages.length}
                   onClick={() => this.state.currentPage !== pages.length && this.getElementsForPage(++this.state.currentPage)}
               >

                   <PaginationLink next href="#" />
               </PaginationItem>
           </Pagination>
       )
   }

   componentDidUpdate(prevProps, prevState, snapshot) {
       if (this.props.postAdded){
           this.props.getTasks(this.state.sortByField)
       }
   }

   handleEdit(task){
        if(this.state.editableTaskId){
             this.props.editTask({...task, newValue: this.state.editedValue});
             this.setState({editableTaskId: null});
             return
        }
       this.setState({editableTaskId: task._id, editedValue: task.text})
   }

    sortBy(sortByField){
        let sortDirection = this.state.sortDirection;
        if(this.state.sortByField === sortByField){
            if(sortDirection === "asc"){

                sortDirection = "desc"
            } else {
                sortDirection = "asc"

            }
            this.setState({sortDirection, currentPage: 1})
        } else {
            this.setState({sortByField, currentPage: 1})
        }

        this.props.getTasks({sortByField, sortDirection, currentPage: 1})
    }

    render() {
      const {tasks, isLoggedIn} = this.props;
      const {editableTaskId, sortByField, sortDirection, editedValue} = this.state;

        return (
            <div className="row">
                <div className="col">
                    <TaskCreatorForm onPostTask={this.props.postTask}/>
                    <div style={{ padding: '50px' }}>
                        <Table>
                            <thead>
                            <tr className={"pointer"}>
                                <th onClick={() => this.sortBy("email")}>Email
                                    {sortByField === "email" && <i className={`ml-2 fas fa-caret-${sortDirection === "asc" ? "up": "down"}`}/>}
                                </th>
                                <th onClick={() => this.sortBy("username")}>Username
                                    {sortByField === "username" && <i className={`ml-2 fas fa-caret-${sortDirection === "asc"  ? "up": "down"}`}/>}
                                </th>
                                <th onClick={() => this.sortBy("text")}>Text
                                    {sortByField === "text" && <i className={`ml-2 fas fa-caret-${sortDirection === "asc"  ? "up": "down"}`}/>}
                                </th>
                                <th onClick={() => this.sortBy("status")}>Status
                                    {sortByField === "status" && <i className={`ml-2 fas fa-caret-${sortDirection === "asc"  ? "up": "down"}`}/>}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                tasks && tasks.length ? tasks[0].tasks.map(task => (
                                    <tr key={task._id}>
                                        <th scope="row">{task.email}</th>
                                        <td>{task.username}</td>
                                        <td>{editableTaskId === task._id ? <input  value={editedValue} onChange={({target}) => this.setState({editedValue: target.value})}/> : task.text}</td>
                                        <td>{!task.status ? "выполнено" : "Oтредактировано администратором"}</td>
                                        {isLoggedIn &&
                                        <td
                                            onClick={() => this.handleEdit(task)}
                                            className={"pointer"}
                                        >
                                            {editableTaskId === task._id ? " Сахранить": "Редактировать"}
                                            <i className={`fas ml-1 fa-${editableTaskId === task._id ? "save": "edit"} font-weight-light`}/>
                                        </td>}
                                    </tr>
                                )) : <p>Загрузка...</p>
                            }
                            </tbody>
                        </Table>
                    </div>
                    {tasks && tasks[0].total_task_count > 2 && this.renderPagination(tasks[0].total_task_count)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
        tasks: state.tasks,
        isLoggedIn: state.isLoggedIn
});

const mapDispatchToProps = (dispatch) => ({
    postTask: (data) => dispatch(ACTIONS.attemptPostTask(data)),
    getTasks: (data) => dispatch(ACTIONS.attemptGetTasks(data)),
    editTask: (data) => dispatch(ACTIONS.attemptEditTask(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReactTableComponent);
