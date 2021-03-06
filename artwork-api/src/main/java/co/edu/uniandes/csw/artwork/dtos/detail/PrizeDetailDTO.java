/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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

import co.edu.uniandes.csw.artwork.entities.PrizeEntity; 

import javax.xml.bind.annotation.XmlRootElement;
import uk.co.jemos.podam.common.PodamExclude;



/**
 * @generated
 */
@XmlRootElement
public class PrizeDetailDTO extends PrizeDTO{
    
    @PodamExclude
    private ArtworkDTO artwork;
    
    public PrizeDetailDTO(){
    super();
    }
    public PrizeDetailDTO(PrizeEntity entity){
    super(entity);
    if (entity.getArtwork()!=null){
        this.artwork = new ArtworkDTO(entity.getArtwork());
        
        }
    }
    @Override 
    public PrizeEntity toEntity(){
    PrizeEntity entity =  super.toEntity();
    
       if (this.getArtwork()!=null){
        entity.setArtwork(this.getArtwork().toEntity());
        }  
       return entity;
    }

 /**
  * @return the artwork
  */
 public ArtworkDTO getArtwork() {
  return artwork;
 }

 /**
  * @param artwork the artwork to set
  */
 public void setArtwork(ArtworkDTO artwork) {
  this.artwork = artwork;
 }

 /**
  * @return the artworks
  */


 /**
  * @param artworks the artworks to set
  */
 
  
}
