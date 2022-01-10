 const styles=`
 .maxtap_container {
    position: relative;
    margin: inherit;
    width: inherit;
    padding: inherit;
    z-index: inherit;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.maxtap_container video {
    width: 100%;
    height: 100%;
}

.maxtap_component_wrapper {
    align-self: flex-end;
    position: absolute;
    right: 0px;
    bottom: calc(6vw + 6vh);
    display: flex;
}
.maxtap_main{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: fit-content;
    background-color: hsla(0, 0%, 0%, 0.2);
    cursor: pointer;
    z-index: 10;
}
.maxtap_img_wrapper {
    margin-left: 0.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.3vw;
    width: 5vw;
}
.maxtap_img_wrapper > img{
    width: 100%;
}
.maxtap_main>p {
    font-family: ubuntu,"Roboto",sans-serif,Arial, Helvetica, sans-serif;
    font-weight: 500;
    font-size: calc(1vw + 0.1rem);
    padding-left: 0.4rem;
    color: white;
}
 `