import './App.css';
import { useMachine } from '@xstate/react';
import {useRef, useEffect, useState } from 'react';
import { createMachine } from 'xstate';

function App() {
  const [lstOutputs,setlstOutputs] = useState([])
  const m = 
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAYgCUBRAZQoBUBtABgF1FQAHAe1lwBddO+NiAAeiACwAmADQgAnogCsAdgDMAOgCcigGw7F4gIw7Gq5ZuUBfS7LRY8hIuoCOhkgCMmrJCC49+gsJiCKo6hurKjIyKqpIAHJLK5qqM4rIKCIoJ6qbKcfkmZjqa1rYYOATELm7oXsJ+fAJCPsGSiorqhqqhcYZxxaqKUTrpEpo66rFmyuI65iZqVjYgdhWOLuIktSz13I2BLUoz6nGqUmczs+Yy8kpxmurxKoqS41GMmoalK+UOVc6bTw7HwNALNUDBWZxR5zVSnPI6SShQyjTKGcL6V7w8SMHRxcRLMr2SpOZyqDx1EF7MFBI7iE5nJEE8RXTQ3DI9GFw3ofJKGJGqb6rP6k8nbbwcalNWkIJKMSboxG9AmfQzKVFZDSRcTtF7awZxIW-EkuRQU4GS-zSw4IAonPKKQxsxiGKR4jWmCKSV7KF59SJ9I3E9bOM3i3ZWg4QxByhXGeKu8zo9W3W3hcRxXS+3pquZZINrf6SLaUy37cGiRCu6G6PEsxKKTSqQymVHiFLqLPtQyOmaMNQFkUuYtAiW+KVRysIaudvT4qS+pst1So730uIzJL4gxqTTaazLfCcCBwYTCkkR8sygC0I1T146e6fzfuM00+UJP2D-0Ml5pNskPR1FmPonSMd9xmUO8MkbZROkYSRoguF8jEHE0AT-a1owQFVO20IZ+XuSQoVRMJJGA5s+k0BC9FeRQ0JDVRMMnYI8QmHEWxeV5okRFFUxMCZ8T3AxNWIl0GP+RRmIrYJ7mhRC9Cg8xtA+RRSNSTsXUkLpPmUBT6OWc8Q0kaSZUbdR9ERDMzBbHUdVXHVO0QtUkjzFkzgPSwgA */
  createMachine({
    states: {
      q1: {
        on: {
          "b": {
            target: "q4",
            actions: () => { setlstOutputs(lstOutputs=>[...lstOutputs,1]) }
          },
          "a": {
            target: "q1",
            internal: true,
            actions: () => { setlstOutputs(lstOutputs=>[...lstOutputs,0])  }
          }
        }
      },
      q4: {
        on: {
          "a": {
            target: "q3",
            actions: () => { setlstOutputs(lstOutputs=>[...lstOutputs,1])  }
        },
          "b": {
            target: "q4",
            internal: true,
            actions: () => { setlstOutputs(lstOutputs=>[...lstOutputs,1])  }
          }
        }
      },
      q3: {
        on: {
          "b": {target: "q1",
          actions: () => { setlstOutputs(lstOutputs=>[...lstOutputs,1]) }},
          "a": {target: "q5",
          actions: () => { setlstOutputs(lstOutputs=>[...lstOutputs,0])  }}
        }
      },
      q5: {
        on: {
          "b": {
            target: "q5",
            internal: true,
            actions: () => { setlstOutputs(lstOutputs=>[...lstOutputs,1])  }
          },
  
          "a": {target: "q2",actions: () => { setlstOutputs(lstOutputs=>[...lstOutputs,1])  }}
        }
      },
      q2: {
        on: {
          "a": {target:"q1",actions: () => { setlstOutputs(lstOutputs=>[...lstOutputs,0])  }},
          "b": {target:"q5",actions: () => { setlstOutputs(lstOutputs=>[...lstOutputs,1])  }}
        }
      },
    },
    on:{
      RESET:{target:"q1",actions: ()=>setlstOutputs(([])=>[])}},
    initial: "q1"
  })
  const [s,send] = useMachine(m)
  const ref = useRef();


  useEffect(()=>{
    for(let element of ref.current.querySelectorAll(`.state`)){
      element.classList.remove("active")
    }
    ref.current.querySelector(`.${s.value}`).classList.add("active")
  },[s])

  return (
    <div className="App">
    <States selector={ref} s={s} send={send} output={lstOutputs} setOutput={setlstOutputs}/>
    </div>
  );
}

function States({s,send,selector,output,setOutput}){
return (
<div className='main'>
<div className="format">
<div className='control' >
  <button onClick={()=>send("a")}>a</button>
  <button onClick={()=>send("b")}>b</button>
</div>
<div className="output"> {output}
</div>
<div className="states" ref={selector}>
<div className="state q1">q1</div>
<div className="state q2">q2</div>
<div className="state q3">q3</div>
<div className="state q4">q4</div>
<div className="state q5">q5</div>
</div>
<button onClick={()=>send("RESET")}>Reset</button>
</div>
</div>)
}
export default App;
