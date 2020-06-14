import React from 'react';
import { Column } from './Column'
import { AddNewItem } from './AddNewItem'
import { AppContainer } from './styles'
import { useAppState } from './AppStateContext'

const App = () => {
  const { state } = useAppState()
  console.log(state)
  return (
    <AppContainer>
      
     {
       state.lists.map((list, i) => (<Column text={ list.text} key={list.id} index={i} />))
     }     
     <AddNewItem toggleButtonText="+ Add another list"
       onAdd={ console.log}/>
    </AppContainer>
  )
}

export default App;
