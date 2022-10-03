import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Error from './Error';
import Confirm from './Confirm';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const FORM = "FORM";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = 'ERROR_SAVE';
  const ERROR_DELETE = 'ERROR_DELETE';
  const EDIT = "EDIT"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(student, interviewer) {
    if (!student || !interviewer) return;
    if (props.interview && (
      student === props.interview.student &&
      interviewer === props.interview.interviewer.id)) {
      back();
      return;
    };
    const interview = {
      student,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW)).catch(error => transition(ERROR_SAVE, true));;
  }

  const confirmDelete = () => {
    // make axios put request in app.js
    transition(DELETING);
    props.cancelInterview(props.id)
      .then((res) => {
        transition(EMPTY);
      }).catch(error => transition(ERROR_DELETE, true));
  };

  function edit() {
    transition(EDIT);
  }



  return (
    <article className='appointment' data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(FORM)} />}
      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={edit}
        />
      }
      {mode === FORM &&
        <Form
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save}
        />
      }
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && <Confirm onCancel={back} onConfirm={confirmDelete} message="Delete the appointment?" />}

      {mode === DELETING && <Status message='Deleting' />}
      {mode === ERROR_SAVE && <Error onClose={back} message="Something went wrong!" />}
      {mode === ERROR_DELETE && <Error onClose={back} message="Something went wrong!" />}
      {mode === EDIT &&
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={() => props.onCancel}
          onSave={save}
        />
      }


    </article>
  )
}
