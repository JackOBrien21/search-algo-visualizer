    // function changeSquare(curr) {
    //   // dont want to change the color of the start or final square
    //   let currentVisited = visited.find(obj => obj.id === curr.id && obj.startLoc === curr.startLoc && obj.finalLoc === curr.finalLoc) !== undefined;
    //   if (curr.startLoc || curr.finalLoc) {
    //     return
    //   }
    //   const updatedGrid = grid.map((row) => {
    //     return row.map( (element) => {
    //         return (element.id === curr.id && element.id !== start.id) ?
    //           {...element, backgroundColor: "red"} :
    //           element
    //     })
    //   })

     
    //   setGrid(updatedGrid)
    // }

          // don't want to change the color of the start or final square
      // if (curr.startLoc || curr.finalLoc) {
      //   return;
      // }
    
      // // add startLoc and finalLoc properties to visited object
      // const updatedVisited = visited.map(obj => {
      //   if (obj.id === curr.id) {
      //     return {...obj, startLoc: curr.startLoc, finalLoc: curr.finalLoc};
      //   }
      //   return obj;
      // });
    
      // const updatedGrid = grid.map((row) => {
      //   return row.map((element) => {
      //     return (element.id === curr.id && element.id !== start.id) ?
      //       {...element, backgroundColor: "red"} :
      //       element
      //   })
      // })
    
      // setVisited(updatedVisited);
      // setGrid(updatedGrid);


     


      
  //   console.log("IS RUNNING ON RENDER: ", isRunningRef.current)    
  //   const gridEls = grid.map( (row, index) => {
  //       const rowEls = row.map( (element) => {
  //       let currentVisited = visited.find(obj => obj.id === element.id && obj.startLoc === element.startLoc && obj.finalLoc === element.finalLoc) !== undefined;

  //           return (
  //               <div style={
  //                   {
  //                       display: 'flex',
  //                       flex: 1,
  //                       justifyContent: 'center',
  //                       alignItems: 'center',
  //                       borderStyle: 'solid',
  //                       backgroundColor: currentVisited ? "red" : element.backgroundColor || "white"
  //                   }
  //               }
  //                   key={element.id}
  //                   onClick={() => toggle(element.id)}
  //               >
  //                   {element.id}
  //               </div>
  //           );
  //       });
  //       return <div style={{display: 'flex', flexWrap: 'wrap', flex: 1}} key={index}>{rowEls}</div>;
  //   });

  // useEffect((() => window.alert("Hi there! Please click two spots on the grid.\n The first click will represent the start location of the search and the second click will represent the destination of the search.")), [])




    async function breadthFirstSearch() {
        setVisited([]); // make sure nothing is in visited array
        isRunningRef.current = true;
        if (start.id == null || final.id == null) {
          return;
        }
        queue.enqueue({...start, startLoc: true});
        while (!queue.isEmpty() && isRunningRef.current) {
          await delay(100);
          let current = queue.dequeue();
      
          // check if current object has already been visited
          let exists = visited.find(obj =>
            obj.id === current.id &&
            obj.startLoc === current.startLoc &&
            obj.finalLoc === current.finalLoce
          ) !== undefined;
      
          console.log("WE HAVE ALREADY BEEN HERE", exists)
          if (!isRunningRef.current) {
            return;
          } else if (current.id === final.id) {
            console.log("AT END")
            return;
          } else if (exists) {
            console.log("do nothing been here")
          } else {
            let nextMoves = computeMoves(current);
            for (let move of nextMoves) { 
              queue.enqueue({...move, startLoc: false, finalLoc: false});
            }
            setVisited([...visited, {...current, startLoc: false, finalLoc: false}]);
      
            if (current.id !== final.id && current.id !== start.id) {
              console.log("here")
              changeSquare(current);
            }
          }
        }
      }

      
    // async function breadthFirstSearch() {
    //   setVisited([]) // make sure nothing is in visited array
    //   isRunningRef.current = true
    //   if (start.id == null || final.id == null) {
    //     return
    //   }
    //   queue.enqueue(start)
    //   while (!queue.isEmpty() && isRunningRef.current) {
    //     await delay(100)
    //     let current = queue.dequeue()
    //     let exists = visited.find(obj => obj.id===current.id && obj.finalLoc===current.finalLoc && obj.startLoc===current.startLoc) !== undefined

    //     console.log("WE HAVE ALREADY BEEN HERE", exists)
    //     if (!isRunningRef.current) {
    //       return
    //     } else if (current.id === final.id) {
    //       console.log("AT END")
    //       return
    //     } else if (exists) {
    //       console.log("do nothing been here")
    //     }else {
    //       let nextMoves = computeMoves(current)
    //       for (let move of nextMoves) { 
    //         queue.enqueue(move)
    //       }
    //       setVisited([...visited, current])

    //       if (current.id !== final.id && current.id !== start.id) {
    //         console.log("here")
    //         changeSquare(current)
    //       }
    //     }
    //   }
    // }