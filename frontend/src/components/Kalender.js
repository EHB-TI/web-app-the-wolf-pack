import React, { useEffect, useState } from "react";
import { getAllMovies } from "../api/movies";
import {
  ScheduleComponent,
  Day,
  Week,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { isNullOrUndefined, L10n } from "@syncfusion/ej2-base";
import { getMovieById } from "../api/movies";
import { useAuth0 } from "@auth0/auth0-react";
import { UpdateMovie } from "../api/movies";
import { v4 as uuidv4 } from 'uuid';

L10n.load({
  "en-US": {
    schedule: {
      newEvent: "Film event toevoegen",
      editEvent: "Film event aanpassen",
      deleteEvent: "Film event verwijderen",
      delete: "verwijderen",
      cancel: "annuleren",
    },
  },
});

export const Kalender = () => {
  const { v4: uuidv4 } = require('uuid');
  const [movies, setMovies] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    getAllMovies().then((movies) => setMovies(movies));
  }, []);

  // Het begin uur van een film terug geven
  function getStartTimeMovie(datum, uur) {
    datum.setHours(parseInt(uur));
    return datum;
  }
  // Het eind uur gaan terug geven van een film
  function getEndTimeMovie(datum, uur) {
    datum.setHours(parseInt(uur) + 3);
    return datum;
  }

  // Array van films die in kalender verwerkt wordt
  var dataKalender = [];
  movies
    .filter((movie) => movie.isReleased)
    .map((movie) => {
      movie.vertoningen.map((vertoning) => {
        let starttime = new Date(vertoning.datum);
        let endtime = new Date(vertoning.datum);
        dataKalender.push({
          Id: movie._id,
          Subject: movie.titel,
          StartTime: getStartTimeMovie(starttime, vertoning.uur),
          EndTime: getEndTimeMovie(endtime, vertoning.uur),
          Zaal: vertoning.zaal,
          vertoning_id: vertoning._id,
        });
      });
    });

  // Nodig voor de data in de vertoningen te steken
  function getLocalDateString(date) {
    return date.toLocaleDateString("nl-BE", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    });
  }

  // Als de editortemplate sluit de vertoning update met de extra data en de kalender refreshen (Is beter)
  const popupClose = async (args) => {
    console.log("in popupclose");
    var film;
    if (args.type === "Editor" && !isNullOrUndefined(args.data)) {
      console.log("In editor");
      // De film die gespeeld wordt
      let filmElement = args.element.querySelector("#Film");
      if (filmElement) {
        args.data.Film = filmElement.value;
        film = movies
          .filter((movie) => movie.isReleased)
          .find((movie) => movie.titel === filmElement.value);

        // Begin uur en eind uur + de datum van de film die gespeeld wordt
        var end = new Date(args.data.StartTime);
        end.setHours(end.getHours() + 3);
        args.data.EndTime = end;
        // De zaal waar de film gespeeld wordt
        let zaalElement = args.element.querySelector("#Zaal");
        if (zaalElement) {
          args.data.Zaal = zaalElement.value;
          let vertoningElement = args.element.querySelector("#vertoning_id");
          if (vertoningElement) {
            args.data.vertoning_id = vertoningElement.innerHTML;
            const movie = await getMovieById(film._id);
            //Code voor het update van de film
            if (args.data.vertoning_id === "") {
              console.log("if");
              // doe create
              args.data.vertoning_id = uuidv4()
              movie.vertoningen.push({
                datum: getLocalDateString(new Date(args.data.StartTime))
                  .split(" ")
                  .slice(1)
                  .join(" "),
                dag: getLocalDateString(new Date(args.data.StartTime)).split(
                  " "
                )[0],
                zaal: args.data.Zaal.toString(),

                uur: new Date(args.data.StartTime).toTimeString().substring(0,5),
                _id: uuidv4()

              });
              const accessToken = await getAccessTokenSilently();
              await UpdateMovie(film._id, accessToken, movie);
            } else {
              console.log("else");
              movie.vertoningen.forEach((vertoning) => {
                if (vertoning._id === args.data.vertoning_id) {
                  vertoning.datum = getLocalDateString(
                    new Date(args.data.StartTime)
                  )
                    .split(" ")
                    .slice(1)
                    .join(" ");
                  vertoning.dag = getLocalDateString(
                    new Date(args.data.StartTime)
                  ).split(" ")[0];
                  vertoning.uur = new Date(args.data.StartTime)
                    .toTimeString()
                    .substring(0, 5);
                  vertoning.zaal = args.data.Zaal.toString();
                }
              });
              const accessToken = await getAccessTokenSilently();
              await UpdateMovie(film._id, accessToken, movie);
            }
          }
        }
      }
    }
    if (args.type === "DeleteAlert" && !isNullOrUndefined(args.data)) {
     var deletedFilm = movies.filter(movie => movie.isReleased).find(movie => movie.titel === args.data.Subject);
     deletedFilm.vertoningen.forEach(element => {
       if(element._id === args.data.vertoning_id){
         var indexVertoning = deletedFilm.vertoningen.indexOf(element);
         deletedFilm.vertoningen.splice(indexVertoning,1);
       }
     });
     const accessToken = await getAccessTokenSilently();
     await UpdateMovie(deletedFilm._id, accessToken, deletedFilm);
    }
  };

  // HTML Editortemplate weergave die de admin kan invullen
  const editorTemplate = (props) => {
    return props !== undefined ? (
      <table
        className="custom-event-editor"
        style={{ width: "100%", cellpadding: "5" }}
      >
        <tbody>
          <tr>
            <td className="e-textlabel">Film</td>
            <td style={{ colspan: "4" }}>
              <DropDownListComponent
                id="Film"
                placeholder="Kies film"
                data-name="Subject"
                className="e-field"
                style={{ width: "100%" }}
                dataSource={movies
                  .filter((movie) => movie.isReleased)
                  .map((movie) => movie.titel)}
              />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Start uur</td>
            <td colSpan={4}>
              <DateTimePickerComponent
                format="dd/MM/yy hh:mm a"
                id="StartTime"
                data-name="StartTime"
                value={new Date(props.startTime || props.StartTime)}
                className="e-field"
              ></DateTimePickerComponent>
            </td>
          </tr>

          <tr>
            <td className="e-textlabel">Zaal</td>
            <td style={{ colspan: "4" }}>
              <DropDownListComponent
                id="Zaal"
                placeholder="Kies zaal"
                data-name="Zaal"
                className="e-field"
                style={{ width: "100%" }}
                dataSource={["1", "2", "3", "4"]}
              />
            </td>
          </tr>
          <tr>
            <td id="vertoning_id" style={{ display: "none" }}>
              {props.vertoning_id}
            </td>
          </tr>
        </tbody>
      </table>
    ) : (
      <div />
    );
  };

  return (
    <div className="mt-2 ml-20 pr-20 float-right w-auto h-auto overflow-auto ">
      <ScheduleComponent
        startHour="9:00"
        endHour="24:00"
        firstDayOfWeek={1}
        dateFormat="dd/MM/yyyy"
        timeFormat="HH:mm"
        showQuickInfo={false}
        editorTemplate={editorTemplate}
        eventSettings={{
          dataSource: dataKalender,
        }}
        popupClose={popupClose}
      >
        <ViewsDirective>
          <ViewDirective option="Day" />
          <ViewDirective option="Week" />
        </ViewsDirective>
        <Inject services={[Day, Week]} />
      </ScheduleComponent>
    </div>
  );
};
export default Kalender;
