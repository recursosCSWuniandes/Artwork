/*
The MIT License (MIT)

Copyright (c) 2015 Los Andes University

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
package co.edu.uniandes.csw.artwork.dtos.detail;

import co.edu.uniandes.csw.artwork.dtos.minimum.*;
import co.edu.uniandes.csw.artwork.entities.ArtworkEntity;
import co.edu.uniandes.csw.artwork.entities.PrizeEntity;
import java.util.ArrayList;
import java.util.List;
 
import javax.xml.bind.annotation.XmlRootElement;
import uk.co.jemos.podam.common.PodamExclude;

/**
 * @generated
 */
@XmlRootElement
public class ArtworkDetailDTO extends ArtworkDTO{


    @PodamExclude
    private ArtistDTO artist;
    
   @PodamExclude
   private List<PrizeDetailDTO> prizes;
    
    /**
     * @generated
     */
    public ArtworkDetailDTO() {
        super();
    }

    /**
     * Crea un objeto ArtworkDetailDTO a partir de un objeto ArtworkEntity incluyendo los atributos de ArtworkDTO.
     *
     * @param entity Entidad ArtworkEntity desde la cual se va a crear el nuevo objeto.
     * @generated
     */
    public ArtworkDetailDTO(ArtworkEntity entity) {
        super(entity);
        List<PrizeDetailDTO> prized= new ArrayList<>();
        if (entity.getArtist()!=null){
        this.artist = new ArtistDTO(entity.getArtist());
        
        }
        if(entity.getPrizes()!=null){
        for(PrizeEntity prize : entity.getPrizes()){
        prized.add(new PrizeDetailDTO(prize));
        }
        this.setPrizes(prized);
        }
        
        
    }

    /**
     * Convierte un objeto ArtworkDetailDTO a ArtworkEntity incluyendo los atributos de ArtworkDTO.
     *
     * @return Nueva objeto ArtworkEntity.
     * @generated
     */
    @Override
    public ArtworkEntity toEntity() {
        ArtworkEntity entity = super.toEntity();
        List<PrizeEntity> prize =new ArrayList<>();
        if (this.getArtist()!=null){
        entity.setArtist(this.getArtist().toEntity());
        }
        if(this.getPrizes()!=null){
        for(PrizeDetailDTO prid : this.getPrizes()){
        prize.add(prid.toEntity());
        }
        entity.setPrizes(prize);
        }
        
        
        return entity;
    }

    /**
     * Obtiene el atributo artist.
     *
     * @return atributo artist.
     * @generated
     */
    public ArtistDTO getArtist() {
        return artist;
    }

    /**
     * Establece el valor del atributo artist.
     *
     * @param artist nuevo valor del atributo
     * @generated
     */
    public void setArtist(ArtistDTO artist) {
        this.artist = artist;
    }

 /**
  * @return the prizes
  */
 public List<PrizeDetailDTO> getPrizes() {
  return prizes;
 }

 /**
  * @param prizes the prizes to set
  */
 public void setPrizes(List<PrizeDetailDTO> prizes) {
  this.prizes = prizes;
 }

    /**
     * @return the comments
     */
    

}
