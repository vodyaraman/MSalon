import { useState } from "react";
import "./GeoMap.scss";

export default function GeoMap() {
    const [activeMap, setActiveMap] = useState<"kremlin" | "pasternak">("kremlin");

    const maps = {
        kremlin: "https://yandex.ru/map-widget/v1/?um=constructor%3Ae7ed58587048c3db95bf2ace27309bbac873ec3dec2ca9a82e87796097331c50&amp;source=constructor",
        pasternak: "https://yandex.ru/map-widget/v1/?um=constructor%3A0380e24f6a1fa03987633bc665d0bf4bfd8ca612badf65448da785765be093f8&amp",
    };

    return (
        <article className="geo__content">
            <h2 className="geo__title">Мы на карте Москвы</h2>
            <p className="geo__discription">
                Ostrovityanova str. 7, metro Yugo-Zapadnaya, Konkovo, Moscow, Russia
            </p>
            <div className="geo__map">
                <iframe
                    src={maps[activeMap]}
                    width="100%"
                    height="400"
                    frameBorder="0"
                />
            </div>
            <div className="geo__controls">
                {activeMap === "kremlin" ? (
                    <button onClick={() => setActiveMap("pasternak")}>
                        Показать памятник Пастернаку
                    </button>
                ) : (
                    <button onClick={() => setActiveMap("kremlin")}>
                        Показать Кремль
                    </button>
                )}
            </div>
        </article>
    );
}
