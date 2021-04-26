import pl from "date-fns/locale/pl";
import buildLocalizeFn from 'date-fns/locale/_lib/buildLocalizeFn'
  
  const monthValues = {
    narrow: ["Я", "Ф", "М", "А", "М", "И", "И", "А", "С", "О", "Н", "Д"],
    abbreviated: [
      "янв.",
      "фев.",
      "март",
      "апр.",
      "май",
      "июнь",
      "июль",
      "авг.",
      "сент.",
      "окт.",
      "нояб.",
      "дек."
    ],
    wide: [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień"
    ]
  };

  pl.localize.month = buildLocalizeFn({
    values: monthValues,
    defaultWidth: 'wide',
    defaultFormattingWidth: 'wide'
  })

  export default pl