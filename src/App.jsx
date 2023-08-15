import { useState } from "react";

function App() {
  const [activity, setAvtivity] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState({});
  const [pesan, setPesan] = useState("");

  //function untuk membuat id dengan menggunakan waktu sekarang
  function makeId() {
    return Date.now();
  }
  //function untuk membuat list todo
  function todoHandler(e) {
    e.preventDefault(); // funtion preventDeault() biar udh input kosong lagi

    if (!activity) {
      return setPesan("Masukkan Aktifitas!");
    }
    setPesan('');
    if (edit.id) {
      const update = {
        ... edit,
        activity,
        done: false,
      };
      // find index buat cari index array
      const editIndex = todos.findIndex(function (todo) {
        return todo.id == edit.id; //
      });
      const updated = [...todos]; //array kosong ngambil dari todos di spread
      updated[editIndex] = update;
      setTodos(updated); //menyimpan hasil daro edit ke dalam array

      return cancel(); //supaya kalau dihapus form bakal kosong
    }

    setTodos([
      ...todos,
      {
        id: makeId(),
        activity,
        done: false
      },
    ]);
    setPesan("");
    setAvtivity("");
  }

  function delTodos(todoId) {
    const filter = todos.filter(function (todo) {
      return todo.id !== todoId; //function bakal cek id yang ga sama
    });
    setTodos(filter); //membuat id yang sama akan terhapus dari array
    if (edit.id) cancel(); //cek dalam mode edit, klo engga bakal ditambah
  }

  function editTodos(todo) {
    setAvtivity(todo.activity);
    setEdit(todo);
  }

  function cancel() {
    setEdit({});
    setAvtivity("");
  }

  function doneHandler(todo){
    const update = {
      // id: todo.id,
      // activity: todo.activity,
      ... todo,
      done:todo.done ? false : true,
    };
    const editIndex = todos.findIndex(function(value) {
      return value.id = todo.id;
    });
    const updated = [... todos];
    updated[editIndex] = update;
    
    setTodos(updated)
  }

  return (
    <>
      <h1>Simple Todo List</h1>
      {pesan && <div style={{ color: "red" }}>{pesan}</div>}
      <form onSubmit={todoHandler}>
        <input
          type="text"
          placeholder="Aktifitas"
          value={activity}
          onChange={function (e) {
            setAvtivity(e.target.value);
          }}
        ></input>
        <button type="submit">{edit.id ? "Simpan" : "Tambah"}</button>
        {edit.id && <button onClick={cancel}>Batal</button>}
      </form>
      {todos.length > 0 ? (
        <ul>
          {todos.map(function (todo) {
            return (
              <li key={todo.id}>
                <input type="checkbox" checked={todo.done} onChange={doneHandler.bind(this, todo)}></input>
                {todo.activity}
                ({todo.done ? 'Selesai' : 'Belum'})
                {/* tombol hapus di pake fungsi bind trus isi this, nama variabel yang mau diambil */}
                <button onClick={editTodos.bind(this, todo)}>Edit</button>
                <button onClick={delTodos.bind(this, todo.id)}>Hapus</button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>
          <i>Tidak Ada Aktifitas</i>
        </p>
      )}
    </>
  );
}

export default App;
