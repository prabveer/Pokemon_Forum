const supabaseUrl = 'https://mylkdlyzovgyusvfppux.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
const comments = (props) => {
    const [champions, setChampions] = useState(null);

    useEffect (() => {
        async function getChampions() {
          const {data, error} = await supabase.from('Posts').select().eq('id', props.id);
          if(error) {
            console.warn(error)
          }
          console.log(data)
          setChampions(data)
        }
        getChampions()
    }, [])
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(count.name )
        //await supabase
        //.from('Posts')
        //.update({title: count.name, content: count.title, image_url: count.role})
       // .eq('id', params.id);

    
      //window.location = "/";
    }

    const handleInputChange = (event)  => {
        const name = event.target.name;
        const value = event.target.value;

        setCount(values => ({...values, [name]: value}))
      }


    return (
        <>
        <div>Hello</div>
        <form onSubmit={handleSubmit}>
            <label for="name">comment</label> <br />
            <input type="text" itd="name" name="name" value={count.name || ""}  onChange={handleInputChange} required/><br />
            <br/>
        </form>
        </>
    );
  };
  
  export default comments;