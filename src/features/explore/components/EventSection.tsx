import { exploreItems } from "../const/event"
import { EventCard } from "./EventCard"

export function EventSection() {
  return (
    <section aria-label="Explore" className="w-full">
      <div className="w-full h-9 bg-cream"></div>
      {exploreItems.map((item, index) => (
        <EventCard key={item.title} {...item} index={index} />
      ))}
    </section>
  )
}
